import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Serendaleai from "pages/Serendaleai";
import ChatGPT from "pages/ChatGPT";
import MainUI from "pages/MainUI";
import StartScreens from "pages/StartScreens";
import Dashboard from "pages/Dashboard";
import WithDraw from "pages/WithDraw";
import CryptoCapLanding from "pages/CryptoCapLanding";
import LandingOne from "pages/LandingOne";
import LandingTwo from "pages/LandingTwo";
import RightBanner from "pages/RightBanner";
import NFTMarketplace from "pages/NFTMarketplace";
import Deposits from "pages/Deposits";

const ProjectRoutes = () => {
    let element = useRoutes([
        { path: "/", element: <Home /> },
        { path: "*", element: < NotFound /> },
        {
            path: "serendaleai",
            element: <Serendaleai />,
        },
        {
            path: "chatgpt",
            element: <ChatGPT />,
        },
        {
            path: "mainui",
            element: <MainUI />,
        },
        {
            path: "startscreens",
            element: <StartScreens />,
        },
        {
            path: "dashboard",
            element: <Dashboard />,
        },
        {
            path: "withdraw",
            element: <WithDraw />,
        },
        {
            path: "cryptocaplanding",
            element: <CryptoCapLanding />,
        },
        {
            path: "landingOne",
            element: <LandingOne />,
        },
        {
            path: "landingTwo",
            element: <LandingTwo />,
        },
        {
            path: "rightbanner",
            element: <RightBanner />,
        },
        {
            path: "nftmarketplace",
            element: <NFTMarketplace />,
        },
        {
            path: "deposits",
            element: <Deposits />,
        },
    ]);
    return element;
};

export default ProjectRoutes;