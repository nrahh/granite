export type dropdownOption = [icon: string, label: string, returnValue: string, ]

export default function Dropdown(options: dropdownOption[], ): Promise < string > {
    return new Promise((resolve) => {
        window.dispatchEvent(new CustomEvent("granite:dropdown", {
            detail: {
                options,
                resolve
            },
        }), )
    })
}