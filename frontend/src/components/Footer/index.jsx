import { Text, Heading, Img } from "./..";
import React from "react";

export default function Footer({ ...props }) {
    return (
        <footer {...props} className={'${props.className} flex flex-col items-center gap-12'}>
            < div className="h-px w-full self-stretch bg-white-a700_0c" />
            <div className="container-xs md:px-5">
                <div className="flex items-center justify-between gap-5 md: flex-col">
                    <div className="flex w-[22%] flex-col gap-[62px] md:w-full sm:gap-[31px]">
                        <div className="flex">
                            <Img src="images/img_footer_logo.png" alt="Footerlogo" className="h-[32px] w-[122px] object-contain" />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-8">
                            <div className="flex gap-3">
                                <Img src="images/img_instagram_ic.svg" alt="Instagramic" className="h-[24px]" />
                                <Img src="images/img_facebook_ic.svg" alt="Facebookic" className="h-[24px]" />
                                <Img src="images/img_twitter_ic.svg" alt="Twitteric" className="h-[24px]" />
                                <Img src="images/img_youtube_ic.svg" alt="Youtubeic" className="h-[24px]" />
                            </div>
                            <Text as="p" className="text-[16px] font-normal">
                                2021 CoinMarketCap. All rights reserved
                            </Text>
                        </div>
                    </div>
                    <div className="flex w-[58%] justify-between gap-5 md:w-full md:flex-col">
                        <div className="flex w-[38%] flex-col items-start gap-5 md:w-full">
                            <Heading
                                size="heading2x1"
                                as="h6"
                                className="!text-font_color-light_title-0 !font-raleway text-[18px] font-semibold"
                            >
                                About Us
                            </Heading>
                            <ul className="flex flex-col items-start gap-5">
                                <li>
                                    <a href="About" target="_blank" rel="noreferrer">
                                        <Text as="p" className="text-[16px] font-normal">
                                            About
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="Careers" target="_blank" rel="noreferrer">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Careers
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="Blog" target="_blank" rel="noreferrer">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Blog
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Legal & privacy
                                        </Text>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex w-[38%] flex-col items-start gap-5 md:w-full">
                            <Heading
                                size="heading2x1"
                                as="h6"
                                className="Itext-font_color-light_title-0 Ifont-raleway text-[18px] font-semibold"
                            >
                                Services
                            </Heading>
                            <ul className="flex flex-col items-start gap-5">
                                <li>
                                    <a href="Aplications" target="_blank" rel="noreferrer">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Aplications
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Buy Crypto
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="Affilliate" target="blank" rel="noreferrer">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Affilliate
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Institutional Services
                                        </Text>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-start gap-5">
                            <Heading
                                size="heading2x1"
                                as="h6"
                                className="Itext-font_color-light_title-0 !font-raleway text-[18px] font-semibold"
                            >
                                Learn
                            </Heading>
                            <ul className="flex flex-col items-start gap-5">
                                <li>
                                    <a href="#">
                                        <Text as="p" className="text-[16px] font-normal">
                                            What is Cryptocurency?
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Crypto Basic
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Tips and Tutorials
                                        </Text>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <Text as="p" className="text-[16px] font-normal">
                                            Market Update
                                        </Text>
                                    </a>
                                </li>
                            </ul>
                        </div >
                    </div >
                </div >
            </div >
        </footer >
    );
}