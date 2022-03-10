import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import BlogPage from "./pages/BlogPage";
import DownloadPage from "./pages/DownloadPage";
import FeedbackPage from "./pages/FeedbackPage";
import FirstPage from "./pages/FirstPage";
import PlanPage from "./pages/PlanPage";
import SubscribePage from "./pages/SubscribePage";
import TrainerPage from "./pages/TrainerPage";
import WorkPage from "./pages/WorkPage";

const HomePage = ()=>{
    return(
        <React.Fragment>
            <Header/>
            <FirstPage/>
            <WorkPage/>
            <PlanPage/>
            <TrainerPage/>
            <FeedbackPage/>
            <BlogPage />
            <DownloadPage />
            <SubscribePage />
            <Footer/>
        </React.Fragment>
    );
}

export default HomePage;