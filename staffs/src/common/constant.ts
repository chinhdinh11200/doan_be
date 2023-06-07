export const statusValidationMessage = {
  required: 600,
  unique: 601,
  invalid: 602,
  max: 603,
  min: 604,
  number: 605,
}
export const validationMessage = {
  required: "Trường %1 không được để trống.",
  unique: "Trường %1 đã tồn tại.",
  invalid: "Trường %1 không hợp lệ.",
  max: "Trường %1 lớn hơn %2 kí tự.",
  min: "Trường %1 nhỏ hơn %2 kí tự.",
  number: "Trường %1 chỉ là các chữ số.",
}

export const FORM_EXAM = {
  'TL' : 0,
  'TN' : 1,
  'VD' : 2,
}

export const codeHVMM = ['H', 'T']

export const codeFee = ['A', 'C', 'D']

export const TYPE_ARTICLESCIENTIFIC = [
  {
    label: "Tạp chí Nature, AAAS",
    value: 0
  },
  {
    label: "Tạp chí khoa học thuộc hệ thống ISI/Scopus(Q1)",
    value: 1
  },
  {
    label: "Tạp chí khoa học thuộc hệ thống ISI/Scopus(Q2)",
    value: 2
  },
  {
    label: "Tạp chí khoa học thuộc hệ thống ISI/Scopus(Q3)",
    value: 3
  },
  {
    label: "Tạp chí khoa học thuộc hệ thống ISI/Scopus(Q4)",
    value: 4
  },
  {
    label: "Tạp chí khoa học thuộc hệ thống ISI/Scopus(Q4)chí quốc tế thuộc danh mục Web of Science, Scopus và các tạp chí quốc tế uy tín khác có chỉ số ISSN",
    value: 5
  },
  {
    label: "Tạp chí khoa học chuyên ngành trong nước được Hội đồng Chức danh Giáo sư Nhà nước công nhận (điểm tối đa theo tạp chí lớn hơn hoặc bằng 1,0 điểm)",
    value: 6
  },
  {
    label: "Tạp chí khoa học chuyên ngành trong nước được Hội đồng Chức danh Giáo sư Nhà nước công nhận (điểm tối đa theo tạp chí lớn hơn hoặc bằng 0,5 điểm)",
    value: 7
  },
  {
    label: "Tạp chí khoa học trong nước có chỉ số ISSN",
    value: 8
  }
]

export const POSITION_STAFF = [
  {
    value: 1,
    label: 'Trưởng Khoa'
  },
  {
    value: 2,
    label: 'Phó Khoa'
  },
  {
    value: 3,
    label: 'Giảng viên'
  },
]

export const FORM_CONSTRUCTION = [
  {
    label: "Xây mới chương trình khung",
    value: 0
  },
  {
    label: "Xây mới chương trình chi tiết",
    value: 1
  },
  {
    label: "Tu sửa chương trình khung",
    value: 2
  },
  {
    label: "Tu sửa chương trình chi tiết",
    value: 3
  },
];