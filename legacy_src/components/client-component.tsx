"use client";

import { ReactNode } from "react";
// import ServerComponent from "./server-component";  // 서버 컴포넌트를 import 

export default function ClientComponent ({
    children
}: { children: ReactNode;
}) {
    console.log("클라이언트 컴포넌트");
    return (
        // <ServerComponent />
        <div>{children}</div>
    )
}