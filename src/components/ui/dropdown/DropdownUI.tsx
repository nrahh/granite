import {useState, useEffect} from "react";
import type {dropdownOption} from "./Dropdown.tsx";
import {motion} from "motion/react";
import {config} from "../../../config.ts"
import {dropdown_container_bg_color,
    dropdown_container_border_thickness,
    dropdown_container_border_color,
    dropdown_button_initial_bg_color,
    dropdown_button_hovered_bg_color,
    dropdown_button_initial_text_color,
    dropdown_button_hovered_text_color,
    dropdown_button_border_color,
    dropdown_button_border_thickness} from "../../../themes/theme_values.ts";
import * as Icons from "lucide-react"

type dropdownRequest = {
    options: dropdownOption[]
    resolve: (value: string) => void
}

export default function DropdownUI() {

    const [request, setRequest] = useState<dropdownRequest | null>(null);
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        let cursorX = 0
        let cursorY = 0

        function handleMouseMove(event: MouseEvent) {
            cursorX = event.clientX
            cursorY = event.clientY
        }

        function handleDropdown(event: Event) {
            const customEvent = event as CustomEvent<dropdownRequest>

            setPosition({
                x: cursorX,
                y: cursorY
            })

            setRequest(customEvent.detail)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("granite:dropdown", handleDropdown)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("granite:dropdown", handleDropdown)
        }
    }, [])

    if (!request) return null

    //the offsets the cursor has from the client's cursor
    const {offsetX, offsetY} = config.dropdown

    return (
        //so the dropdown closes even if out of the dropdown was clicked by the user
        <div className="fixed inset-0 z-50" onClick={() => setRequest(null)}>
            <div style={{
                position: "fixed",
                top: position.y + offsetY,
                left: position.x + offsetX,

                //theme
                backgroundColor: dropdown_container_bg_color,
                border: `${dropdown_container_border_thickness}px solid ${dropdown_container_border_color}`
            }} className={`w-60 h-fit flex flex-col gap-1.5 p-2 rounded-lg`}
                 onClick={(event) => event.stopPropagation()}>
                {request.options.map((option) => {
                    const Icon = Icons[
                        option[0] as keyof typeof Icons
                        ]

                    // @ts-ignore
                    return (
                        <motion.button
                            initial={{
                                color: dropdown_button_initial_text_color,
                                backgroundColor: dropdown_button_initial_bg_color
                            }}
                            whileHover={{
                                color: dropdown_button_hovered_text_color,
                                backgroundColor: dropdown_button_hovered_bg_color
                            }}
                            key={option[2]}
                            type="button"
                            onClick={() => {
                                request.resolve(option[2])
                                setRequest(null)
                            }}
                            style={{
                                border: `${dropdown_button_border_thickness}px solid ${dropdown_button_border_color}`
                            }}
                            className="w-full h-fit flex flex-row gap-2 p-1.5 rounded-md cursor-pointer items-center select-none"
                        >
                            {typeof Icon && (
                                //@ts-ignore
                                <Icon size={16} />
                            )}
                            <span>{option[1]}</span>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}