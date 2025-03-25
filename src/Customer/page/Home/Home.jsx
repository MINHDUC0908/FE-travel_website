import { useEffect } from "react"
import Banner from "./Component/Banner"
import BestTripsSection from "./Component/BestTripsSection"
import CardSection from "./Component/CardSection"
import Tour from "./Component/Tour"
import Comment from "./Component/Comment"


function Home({ setCurrentTitle })
{
    useEffect(() => {
        setCurrentTitle("Trang chủ")
        window.scroll(0, 0)
    }, [setCurrentTitle])
    return (
        <div className="mt-52">
            <Banner/>
            <Tour/>
            <BestTripsSection/>
            {/* <Comment/> */}
            <CardSection/>
        </div>
    )
}

export default Home