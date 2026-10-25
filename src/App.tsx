import {useState} from "react";
import Dropdown from "./components/ui/dropdown/Dropdown.tsx";
import DropdownUI from "./components/ui/dropdown/DropdownUI.tsx";

export default function App() {

    const [result, setResult] = useState<string>("");

    async function openDropdown() {
        const result = await Dropdown([
            ["House", "Home", "home"],
            ["Settings", "Settings", "settings"],
            ["Folder", "Projects", "projects"],
        ])

        setResult(result);
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <button className="text-white" onClick={openDropdown}>open dropdown</button>

            {result && <p className="text-white">Returned: {result}</p>}

            <DropdownUI />
        </div>
    )
}