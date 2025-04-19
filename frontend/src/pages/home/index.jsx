import { Helmet } from "react-helmet";
import { Img, Button, Text, Heading } from "../../components";
import Header from "../../components/Header";
import React from "react";

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Homepage</title>
                <meta name="description" content="web site created using create-react-app" />
            </Helmet>
            <div className="relative h-[1116px] w-full content-end bg-black-900_02 px-[58px] 1g:h-auto md:h-auto md:px-5 sm:px-4">
                <Ing
                    src="images/img_group_4.png"
                    alt="Image"
                    className="mx-auto h-[464px] w-full max-w-[1354px] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-e top-e m-auto h-max w-full max-w-[1610px] flex-1">
                    <div className="relative z-[1] mx-[136px] flex flex-col gap-[174px] 1g:gap-[130px] md:mx-0 md:gap-[130px] sm:gap-[87px]">
                        <Header />
                        <div className="mx-[306px] md: пос-8">
                            <div className="mx-[26px] md:mx-0">
                                <div className="flex flex-col items-center">
                                    <Heading
                                        siz="text8x1"
                                        as="hl"
                                        className="bg-gradients bg-clip-text font-clashgrotesk text-[80px] font-medium tracking-[1.60px] !text-transparent Ig:text-[48px] md:text-[48px]"
                                    >
                                        A Fast Blockchain.
                                    </Heading>
                                    <Heading
                                        size="text8x1"
                                        as="h2"
                                        className="relative mt-[-14px] font-clashgrotesk text-[80px] font-medium tracking-[1.60px] lg:text-[48px] md:text-[48px]"
                                    >
                                        Scalable AΙ.
                                    </Heading>
                                </div>
                            </div>
                            <Text
                                size="text5xl"
                                as="p"
                                className="mt-3 text-center !font-cabinetgrotesk text-[20px] font-normal leading-[33px] tracking-[0.72px] !text-white-0 lg:text-[17px]"
                            >
                                Our technology performing fast blockchain (120K TPS) and it has guaranteed AI-based data security. Proof
                                of Stake, its consensus algorithm enables unlimited speeds.
                            </Text>
                            <div className="mx-44 mt-8 flex gap-3 md:mx-0">
                                <Button
                                    className="get started border w-full rounded-[34px] px [30px] font-spacegrotesk text-white-e sm:px-4"
                                    color="black 900 02"
                                    size="12x1"
                                    variant={null}
                                >
                                    Get started
                                </Button >
                                <Button
                                    color="black 900 02"
                                    size="12x1"
                                    className="w-full rounded-[34px] border-2 border-solid border-white-0 px-[38px] font-spacegrotesk sm:px-4"
                                >
                                    Ecosystems
                                </Button >
                            </div >
                        </div >
                    </div >
                    <Img
                        src="images/img_123z_2101_w020_n001_946b_p15.png"
                        alt="12322101W020"
                        className="relative ml-1 mt-[-62px] h-[504px] w-full object-cover 1g:h-auto md:m1-0 md:h-auto"
                    />
                </div >
            </div >
        </>
    );
}
