import type { IUsernameResult } from "@lib/types/resultTypes";
import { useState } from "react";
import Accordion from "../Accordion";

const SearchResult = ({users} : {users: IUsernameResult[]}) => {
    const [activeAccordion, setActiveAccordion] = useState<string>(`user-${users[0].id}`);

    const handleToggleAccordion = (target: string) => {
        setActiveAccordion(target);
    }
    
    return(
        <div
            className="w-full px-6 md:w-1/2"
        >
            <ul className="w-full h-auto flex flex-col items-center justify-center">
                {users.map((user) => (
                    <li
                        key={`user-${user.id}`}
                        className="w-full h-auto"
                    >
                        <Accordion
                            id={user.id}
                            username={user.username}
                            activeAccordion={activeAccordion}
                            repoUrl={user.repoUrl}
                            onClick={() => handleToggleAccordion(`user-${user.id}`)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchResult;