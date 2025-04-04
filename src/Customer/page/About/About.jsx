import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Our_story from "./components/Ourr_story";
import Mission from "./components/Mission";

function About({ setCurrentTitle }) {
    useEffect(() => {
        setCurrentTitle("Giới thiệu")
        window.scroll(0, 0)
    }, [setCurrentTitle]);
    return (
        <div className="max-w-7xl mt-20 mx-auto">
            {/* Hero Section */}
            <Hero />
            <Our_story />
            <Mission />
        </div>
    );
}

export default About;