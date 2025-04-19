import { Helmet } from "react-helmet";
import { Button, Heading, FloatingLabelInput, Text, Switch, Img } from "../../components";
import Sidebar4 from "../../components/sidebar4";
import React from "react";

export default function WithdrawPage() {
    return (
        <>
            <Helmet>
                <title>rivier</title>
                <meta name="description" content="Web site created using create-react-app" />
            </Helmet>
            <div className="relative h [1038px] w full bg black 900 md:h-auto">
                <Img
                    src="images/img_group_4_indigo_a700.png"
                    alt="Image"
                    className="ml-[184px] h-1536px] w-[62%] object-contain md:ml-0"
                /> <div className="absolute left-e right-e top-e mx-auto flex flex-1 items-start justify-center">
                    <Sidebar4 />
                    <div className="relative mb-11 h-1888px] -[76%]">
                        <Img
                            src="images/img_group_5.png"
                            alt="Image"
                            className="absolute right px topmauto h [702px] w [26%] object contain"
                        />
                        <div className="absolute left & right top [5%] mx 10 flex flex 1 items center justify end gap [25px] md:mx 0">
                            <Heading size="text4x1" as="hi" className="text-[18px] font-medium text-white-1">
                                Evano
                            </Heading>
                            <img src="images/img_ellipse_1.png" alt="Image" className="h-[48px] rounded-[24px) object-cover" />
                        </div>
                        <div className="absolute bottom- left-[5%] my-auto ml-[58px] mr-32 flex flex-1 flex-col Items-center justify-center rounded-[16px] bg-gray-900_99 px-14 py-[94px] md:mx-md:p-5">
                            <div className="x-1.5 (lex w-[87%] items-end justily-center rounded [10px] bg-white-a700 oc p-4 mdtmx- md:w-full">
                                <div className="flex items-center gap-3">
                                    <Button color="yellow_900" size="1g" shape="circle" className="w [32px] rounded [16px] px -1">
                                        <Img src="images/img_close_yellow_900.svg" />
                                    </Button>
                                    <Heading size="headingxl" as="h2" className="text-[16px] font-semibold capitalize">
                                        BTC
                                    </Heading>
                                </div>
                                <div className="flex flex-1 items-center justify-end gap-4">
                                    <Heading
                                        size="heading3x1"
                                        as="h3"
                                        className="text [20px] fornt semibold capitalize Itext white a700_33"
                                    >
                                        0.00000000
                                    </Heading>
                                    <img src="images/img_arrow_down.svg" alt="Arrowdown" className="h-[10px]" />
                                </div>
                            </div >
                            <div className="mx-[60px] mt-10 flex items-center gap-3.5 md:mx-e md:flex-col" >
                                <Heading size="heading3x1" as="h4" className="text-[20px] font-semibold capitalize !text-white-a700_7f" >
                                    FAUCETPAY(LESS FEES)
                                </Heading >
                                <Switch value={true} />
                                <Heading size="heading 3x1" as="h5" className="text-[20px] font-semibold capitalize" >
                                    DIRECT WITHDRAWAL
                                </Heading >
                            </div >
                            <div className="mx-1.5 mt-16 flex w-[82%) rounded-[18px] border border-solid border-white-a700 19 bg-white-a700 вс px-[26px py-[27px md:mx-md:w-full sm:p-s">
                                <Text size="text5x1" as="p" className="text-[20px] font medium capitalize Itext-white-a700_33">
                                    With drawal Address
                                </Text>
                            </div>
                            <div className="ml-1.5 mt-9 flex w-[82%] justify-center gap-30px| md:mi-0 md:w-full mdiflex-col" >
                                <FloatingLabelInput
                                    name="amount"
                                    placeholder={'with drawal amount'}
                                    defaultValue="0.02000000"
                                    floating="contained"
                                    className="h-[70px] flex-grow rounded-[10px] border border-solid border-white-a700_19 bg-white-a700_0c px-[26px] text-[22px] font-semibold capitalize text-white-0 sm:px-5"
                                />
                                <div className="flex w-[32%] justify between gap-5 md:w-full" >
                                    <Button
                                        color="white_A700_0c"
                                        size="11x1"
                                        className="min-w-84px] rounded-[10px) px-5 font-extrabold capitalize !text-white-a700_7f"
                                    >
                                        ALL
                                    </Button >
                                    <Button
                                        color="white_A700_0c"
                                        size="11x1"
                                        className="min-w [84px] rounded [10px] px-5 font-extrabold capitalize !text-white-a700_7f"
                                    >
                                        MTN
                                    </Button >
                                </div >
                            </div >
                            <div className="mt-9 flex w[52%] flex-wrap justify-between gap-5 md:w-full" >
                                <Heading size="heading3x1" as="h6" className="text-[20px] font semibold capitalize !text white-a700_7f">
                                    Гее: 0.003 втс
                                </Heading>
                                <Heading size="heading 3x1" as="h5" className="text-[20px) font-semibold capitalize !text-white-a700_7f">
                                    you receive: 0.017 BTC
                                </Heading>
                            </div >
                            <Button
                                className="pleace_border mt-[52px] min-w-[280px] rounded-[10px] bg-gradient2 px-[27px] font-semibold text-white-0 sm:px-5"
                                size="9x1"
                                variant={null}
                                PLEACE WHITDRAWAL
                            >
                            </ Button >
                        </div >
                    </div >
                </div >
            </div >
        </>
    );
}