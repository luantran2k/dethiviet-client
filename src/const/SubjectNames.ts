export interface ISubject {
    label: string;
    category: string;
}

// export interface ISubjectCategory {
//     subject: ISubject[];
// }

// const SubjectNames = {
//     Common: {
//         Info: {
//             label: "Phổ thông",
//             value: "Common",
//             isInfo: true,
//         },
//         Geography: {
//             value: "Geography",
//             label: "Địa lý",
//         },
//         English: {
//             value: "English",
//             label: "Tiếng Anh",
//         },
//         Literature: {
//             value: "Literature",
//             label: "Văn học",
//         },
//         Mathematics: {
//             value: "Mathematics",
//             label: "Toán học",
//         },
//         History: {
//             value: "History",
//             label: "Lịch sử",
//         },
//         Physics: {
//             value: "Physics",
//             label: "Vật lý",
//         },
//         Chemistry: {
//             value: "Chemistry",
//             label: "Hoá học",
//         },
//         CivicEducation: {
//             value: "CivicEducation",
//             label: "Giáo dục công dân",
//         },
//         Informatics: {
//             value: "Informatics",
//             label: "Tin học",
//         },
//         Technology: {
//             value: "Technology",
//             label: "Công nghệ",
//         },
//         Biology: {
//             value: "Biology",
//             label: "Sinh học",
//         },
//         Different: {
//             value: "Unknown",
//             label: "Khác",
//         },
//     },
//     Economics: {
//         Info: {
//             value: "Economics",
//             label: "Kinh tế học",
//             isInfo: true,
//         },
//         Macroeconomics: {
//             value: "Macroeconomics",
//             label: "Kinh tế vĩ mô",
//         },
//         Microeconomics: {
//             value: "Microeconomics",
//             label: "Kinh tế vi mô",
//         },
//         DevelopmentEconomics: {
//             value: "DevelopmentEconomics",
//             label: "Kinh tế phát triển",
//         },
//         Calculus: {
//             value: "Calculus",
//             label: "Toán cao cấp",
//         },
//         Econometrics: {
//             value: "Economics",
//             label: "Kinh tế lượng",
//         },
//         PublicEconomics: {
//             value: "PublicEconomics",
//             label: "Kinh tế công cộng",
//         },
//         Probability: {
//             value: "Probability",
//             label: "Toán xác suất",
//         },
//         PoliticalEconomicsOfMarxismAndLeninism: {
//             value: "PoliticalEconomicsOfMarxismAndLeninism",
//             label: "Kinh tế chính trị Mác Lênin",
//         },
//         ScientificSocialism: {
//             value: "ScientificSocialism",
//             label: "Chủ nghĩa xã hội khoa học",
//         },
//         PhilosophyOfMarxismAndLeninism: {
//             value: "PhilosophyOfMarxismAndLeninism",
//             label: "Triết học Mác Lênin",
//         },
//         IntroductionToLaws: {
//             value: "IntroductionToLaws",
//             label: "Pháp luật đại cương",
//         },
//         Logics: {
//             value: "Logics",
//             label: "Logic học",
//         },
//         ForeignInvestment: {
//             value: "ForeignInvestment",
//             label: "Đầu tư quốc tế",
//         },
//     },
//     English: {
//         Toeic: {
//             label: "Toeic",
//             value: "Toeic",
//         },
//         IELTS: {
//             label: "IELTS",
//             value: "IELTS",
//         },
//         SAT: {
//             label: "SAT",
//             value: "SAT",
//         },
//         GMAT: {
//             label: "GMAT",
//             value: "GMAT",
//         },
//         TOEFL_IBT: {
//             label: "TOEFL IBT",
//             value: "TOEFL_IBT",
//         },
//     },
// };

const SubjectNames = [
    {
        label: "Phổ thông",
        data: [
            "Địa lý",
            "Tiếng Anh",
            "Văn học",
            "Toán học",
            "Lịch sử",
            "Vật lý",
            "Hoá học",
            "Giáo dục công dân",
            "Tin học",
            "Công nghệ",
            "Sinh học",
            "Khác",
        ],
    },
    {
        label: "Kinh tế",
        data: [
            "Kinh tế vĩ mô",
            "Kinh tế vi mô",
            "Kinh tế phát triển",
            "Toán cao cấp",
            "Kinh tế lượng",
            "Kinh tế công cộng",
            "Toán xác suất",
            "Kinh tế chính trị Mác Lênin",
            "Chủ nghĩa xã hội khoa học",
            "Triết học Mác Lênin",
            "Pháp luật đại cương",
            "Logic học",
            "Đầu tư quốc tế",
            "English",
        ],
    },
    {
        label: "Tiếng Anh",
        data: ["Toeic", "IELTS", "SAT", "GMAT", "TOEFL IBT"],
    },
];

export default SubjectNames;
