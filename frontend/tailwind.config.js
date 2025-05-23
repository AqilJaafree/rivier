module.exports = {
    mode: "jit",
    content: ["./src/**/**/*.{js,ts, jsx, tsx, html, mdx}", "./src/**/*.{js, ts, jsx, tsx,html,mdx}"],
    darkMode: "class",
    theme: {
        screens: { lg: { max: "1440px" }, md: { max: "1050px" }, sm: { max: "550px" } },
        extend: {
            colors: {
                accent_green: "var(--accent green)",
                amber: { 700: "var(--amber_700)", "100_4c": "var(--amber_100_4c)" },
                black: {
                    600: "var(--black_600)",
                    900: "var(-black_900)",
                    "900_01": "var(--black_900_01)",
                    "900_02": "var(--black_900_02)",
                    "900 of": "var(--black 900 ef)",
                    "900_14": "var(--black_900_14)",
                    "900_19": "var(--black_900_19)",
                    "900 33": "var(--black_900_33)",
                    "900_66": "var(--black_900_66)",
                    "900_89": "var(--black_900_89)",
                    "900_dd": "var(--black_900_dd)",
                    black_60: "var(--black_black_60)",
                },
                blue: {
                    100: "var(--blue_100)",
                    700: "var(-blue_700)",
                    "100_00": "var(--blue_100_00)",
                    "100_7a": "var(--blue_100_7a)",
                    a700: "var(--blue_a700)",
                },
                blue_gray: {
                    100: "var(--blue_gray_100)",
                    300: "var(--blue_gray_300)",
                    400: "var(--blue_gray_400)",
                    700: "var(--blue_gray_700)",
                    800: "var(--blue_gray_800)",
                    900: "var(--blue_gray_900)",
                    "100_01": "var(--blue_gray_100_01)",
                    "100_02": "var(--blue_gray_100_02)",
                    "100_b5": "var(--blue_gray_100_b5)",
                    "300_00": "var(--blue_gray_300_00)",
                    "300_3d": "var(--blue_gray_300_3d)",
                    "400_01": "var(--blue_gray_400_01)",
                    "400_02": "var(--blue_gray_400_02)",
                    "400_14": "var(--blue_gray_400_14)",
                    "400_1e": "var(--blue_gray_400_1e)",
                    "400_7a": "var(--blue_gray_400_7a)",
                    "700_3d": "var(--blue_gray_700_3d)",
                    "700_51": "var(--blue_gray_700_51)",
                    "700_7a": "var(--blue_gray_700_7a)",
                    "700_cc": "var(--blue_gray_700_cc)",
                    "800_01": "var(--blue_gray_800_01)",
                    "800_02": "var(--blue_gray_800_02)",
                    "800_28": "var(--blue_gray_800_28)",
                    "800_7a": "var(--blue_gray_800_7a)",
                    "900_01": "var(--blue_gray_900_01)",
                    "900_02": "var(--blue_gray_900_02)",
                    "900_03": "var(--blue_gray_900_03)",
                    "900_04": "var(--blue_gray_900_04)",
                    "900_05": "var(--blue_gray_900_05)",
                    "900_06": "var(--blue_gray_900_06)",
                    "900_07": "var(--blue_gray_900_07)",
                    "900_08": "var(--blue_gray_900_08)",
                    "900_51": "var(--blue_gray_900_51)",
                    "900_66": "var(--blue_gray_900_66)",
                    "900_7a": "var(--blue_gray_900_7a)",
                    "900_99": "var(--blue_gray_900_99)",
                    "900_a3": "var(--blue_gray_900_a3)",
                    "900_cc": "var(--blue_gray_900_cc)",
                },
                bright: "var(--bright)",
                bright_gray: "var(--bright_gray)",
                cyan: { 50: "var(--cyan_50)", 500: "var(--cyan_500)" },
                deep_purple: {
                    50: "var(--deep_purple_50)",
                    500: "var(--deep_purple_500)",
                    "50_01": "var(--deep_purple_50_01)",
                    a100: "var(--deep_purple_a100)",
                    a200: "var(--deep_purple_a200)",
                    a400: "var(--deep_purple_a400)",
                    a400_01: "var(--deep_purple_a400_01)",
                    a400_02: "var(--deep_purple_a400_02)",
                },
                font_color: {
                    light_subtitle: "var(--font_color_light_subtitle)",
                    light_title: "var(--font_color_light_title)",
                    light_title_0: "var(--font_color_light_title_0)",
                    light_title_1: "var(--font_color_light_title_1)",
                },
                gray: {
                    50: "var(--gray_50)",
                    100: "var(--gray_100)",
                    200: "var(--gray_200)",
                    300: "var(--gray_300)",
                    400: "var(--gray_400)",
                    500: "var(--gray_500)",
                    600: "var(--gray_600)",
                    700: "var(--gray_700)",
                    800: "var(--gray_800)",
                    900: "var(--gray_900)",
                    "100_01": "var(--gray_100_01)",
                    "200_01": "var(--gray_200_01)",
                    "200_02": "var(--gray_200_02)",
                    "200_03": "var(--gray_200_03)",
                    "200_3d": "var(--gray_200_3d)",
                    "200_51": "var(--gray_200_51)",
                    "200_a3": "var(--gray_200_a3)",
                    "300_01": "var(--gray_300_01)",
                    "400_01": "var(--gray_400_01)",
                    "400_02": "var(--gray_400_02)",
                    "400_03": "var(--gray_400_03)",
                    "400_19": "var(--gray_400_19)",
                    "900_01": "var(--gray_900_01)",
                    "900_02": "var(--gray_900_02)",
                    "900_03": "var(--gray_900_03)",
                    "900_04": "var(--gray_900_04)",
                    "900_05": "var(--gray_900_05)",
                    "900_06": "var(--gray_900_06)",
                    "900_07": "var(--gray_900_07)",
                    "900_08": "var(--gray_900_08)",
                    "900_09": "var(--gray_900_09)",
                    "900_7a": "var(--gray_900_7a)",
                    "900_7a_01": "var(--gray_900_7a_01)",
                    "900_99": "var(--gray_900_99)",
                },
                gray_footprint: "var(--gray_footprint)",
                green: { 400: "var(--green_400)", a200: "var(--green_a200)" },
                high_fidelity_color: {
                    card_background: "var(--high_fidelity_color_card_background)",
                    main_background: "var(--high_fidelity_color_main_background)",
                    primary_color: "var(--high_fidelity_color_primary_color)",
                },
                indigo: {
                    50: "var(--indigo_50)",
                    900: "var(--indigo_900)",
                    "50_01": "var(--indigo_50_01)",
                    "50_02": "var(--indigo_50_02)",
                    "900_01": "var(--indigo_900_01)",
                    "900_02": "var(--indigo_900_02)",
                    a100: "var(--indigo_a100)",
                    a100_01: "var(--indigo_a100_01)",
                    a200: "var(--indigo_a200)",
                    a200_00: "var(--indigo_a200_00)",
                    a200_01: "var(--indigo_a200_01)",
                    a200_28: "var(--indigo_a200_28)",
                    a200_33: "var(--indigo_a200_33)",
                    a200_51: "var(--indigo_a200_51)",
                    a200_7a: "var(--indigo_a200_7a)",
                    a200_b7: "var(--indigo_a200_b7)",
                    a200_cc: "var(--indigo_a200_cc)",
                    a400: "var(--indigo_a400)",
                    a700: "var(--indigo_a700)",
                },
                light_blue: { 400: "var(--light_blue_400)" },
                middle: "var(--middle)",
                pink: { 100: "var(--pink_100)", a400: "var(--pink_a400)" },
                purple: {
                    500: "var(--purple_500)",
                    800: "var(--purple_800)",
                    900: "var(--purple_900)",
                    "100_4c": "var(--purple_100_4c)",
                    "500_bf": "var(--purple_500_bf)",
                    a200: "var(--purple_a200)",
                    a200_01: "var(--purple_a200_01)",
                    a200_02: "var(--purple_a200_02)",
                    a400: "var(--purple_a400)",
                    a400_01: "var(--purple_a400_01)",
                    a700: "var(--purple_a700)",
                },
                red: {
                    200: "var(--red_200)",
                    300: "var(--red_300)",
                    900: "var(--red_900)",
                    a700: "var(--red_a700)",
                    a700_01: "var(--red_a700_01)",
                },
                secondary: {
                    grey: "var(--secondary_grey)",
                    grey_300: "var(--secondary_grey_300)",
                    grey_600: "var(--secondary_grey_600)",
                    grey_700: "var(--secondary_grey_700)",
                },
                teal: {
                    300: "var(--teal_300)",
                    500: "var(--teal_500)",
                    "500_b2": "var(--teal_500_b2)",
                    a200: "var(--teal_a200)",
                    a400: "var(--teal_a400)",
                    a400_01: "var(--teal_a400_01)",
                },
                text: { "3": "var(--text_3__)" },
                white: {
                    0: "var(--white_0)",
                    1: "var(--white_1)",
                    a700: "var(--white_a700)",
                    a700_0c: "var(--white_a700_0c)",
                    a700_11: "var(--white_a700_11)",
                    a700_14: "var(--white_a700_14)",
                    a700_19: "var(--white_a700_19)",
                    a700_28: "var(--white_a700_28)",
                    a700_33: "var(--white_a700_33)",
                    a700_63: "var(--white_a700_63)",
                    a700_77: "var(--white_a700_77)",
                    a700_7f: "var(--white_a700_7f)",
                    a700_8b: "var(--white_a700_8b)",
                    a700_b7: "var(--white_a700_b7)",
                    a700_cc: "var(--white_a700_cc)",
                },
                yellow: { 900: "var(--yellow_900)" },
                gray_shadow: "var(--gray_shadow)",
                colors: "#707eaeff",
            },
            boxShadow: {
                xs: "0 18px 40px 0 #7090b01e",
                sm: "0 0 6px 0 #00000019",
                md: "00 24px 0 #6366f151",
                lg: "0 8px 24px 0 #030712",
                xl: "0 3px 49px 9px #0000000f",
                "2xl": "14px 17px 40px 4px #7090b014",
                "3xl": "0 40px 58px 20px #7090b01e",
                "4xl": "00 13px 5px #00000029",
                bs: "inset 0 1px 1px 0 #ffffff28",
            },
            backgroundImage: {
                gradient: "linear-gradient(144deg, #ffffff,#d8d8d8b5)",
                gradient1: "linear-gradient(to right, #12937a3,#12937a3)",
                gradient2: "linear-gradient(225deg, #18c7ff,#933ffd)",
                gradient3: "linear-gradient(359deg, #1f2937a3,#1f2937)",
                gradient3: "linear-gradient(359deg, #1f2937a3,#1f2937)",
                gradient4: "linear-gradient(to right, #4f46e5, #6366f1)",
                gradient5: "linear-gradient(189deg, #fa03f5, #aa9cff)",
                gradient6: "radial-gradient(311deg, #6366f17a,#6366f17a)",
                gradient7: "linear-gradient(to right, #1f293766,#1f293766)",
                gradients: "linear-gradient(135deg, #858cff,#4318ff)",
                gradient9: "linear-gradient(90deg, #ff3bff, #ecbebe, #5c24ff, #d94fd5)",
                gradient10: "linear-gradient(135deg, #111827, #6366f128,#111827), url(/public/images/img_video.png)",
                gradient11: "linear-gradient(137deg, #111827, #1f29377a,#111827)",
                gradient12: "linear-gradient(90deg, #f9fafb,#e5e7eb, #c7d2fe,#e5e7eb, #f9fafb)",
                gradient13: "linear-gradient(90deg, #9ca3af00, #9ca3af3d, #9ca3af00)",
                gradient14: "linear-gradient(135deg, #1118277a, #1f29377a, #1922317a, #1118277a)",
                gradient15: "linear-gradient(135deg, #1118277a,#1f29377a,#1118277a)",
                gradient16: "linear-gradient(90deg, #c7d2fe00, #c7d2fe7a)",
                gradient17: "linear-gradient(90deg, #6366f1, #c7d2fe)",
                gradient18: "linear-gradient(90deg, #c7d2fe7a,#c7d2fe00)",
                gradient19: "linear-gradient(190deg, #elbee74c, #ffecb34c)",
            },
            fontFamily: {
                helveticaneue: "Helvetica Neue",
                roboto: "Roboto",
                raleway: "Raleway",
                dmsans: "DM Sans",
                inter: "Inter",
                clashgrotesk: "Clash Grotesk",
                montserrat: "Montserrat",
                nacelle: "Nacelle",
                poppins: "Poppins",
                cabinetgrotesk: "Cabinet Grotesk",
                spacegrotesk: "Space Grotesk",
            },
            opacity: { 0.48: 0.48 },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};