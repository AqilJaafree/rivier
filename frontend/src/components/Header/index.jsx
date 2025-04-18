import Img from "../../components/Img";
import Heading from "../../components/Heading";
import React from "react";

export default function Header({ ...props }) {
    return (
        <header {...props} className={'${props.className} flex md: flex-col justify-between items-center gap-5'}>
            <Img src="images/img_header_logo.png" alt="Headerlogo" className="h-[34px] w-[116px] object-contain" />
            <ul className="flex flex-wrap gap-10">
                <li>
                    <a href="#">
                        <Heading size="text4xl" as="p" className="!font-clashgrotesk text-[18px] font-normal">
                            Smart Contracts
                        </Heading>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Heading size="text4xl" as="p" className="!font-clashgrotesk text-[18px] font-normal">
                            Services
                        </Heading>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Heading size="text4x1" as="p" className="!font-clashgrotesk text-[18px] font-normal">
                            Solutions
                        </Heading>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Heading size="text4xl" as="p" className="!font-clashgrotesk text-[18px] font-normal">
                            Roadmap
                        </Heading>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Heading size="text4x1" as="p" className="font-clashgrotesk text-[18px] font-normal">
                            Whitepaper
                        </Heading>
                    </a>
                </li>
            </ul>
            <div className="flex gap-4">
                <a href="#">
                    <Img src="images/img_mdi_github.svg" alt="Mdigithub" className="h-[20px]" />
                </a>
                <a href="#">
                    <Img src="images/img_mdi_discord.svg" alt="Mdidiscord" className="h-[20px]" />
                </a>
                <a href="#">
                    <Img src="images/img_mdi_reddit.svg" alt="Mdireddit" className="h-[20px]" />
                </a>
                <a href="#">
                    <Img src="images/img_mdi_twitter.svg" alt="Mditwitter" className="h-[20px]" />
                </a>
            </div>
        </header>
    );
}