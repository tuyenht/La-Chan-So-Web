import { ScamAlert, BlacklistAccount, SecurityArticle, EmergencyContact, QuizQuestion, InteractiveDrill } from '../types';

export const INITIAL_SECURITY_SCORE = {
  score: 94,
  status: 'good' as const,
  lastScan: 'Vừa xong',
  threatsBlocked: 28,
  activeProtections: 6,
  totalProtections: 6,
};

// -------------------------------------------------------------
// COMPREHENSIVE 30+ SCAM PATTERNS ACROSS 4 CORE GROUPS
// -------------------------------------------------------------
export const HOT_ALERTS: ScamAlert[] = [
  // GROUP 1: CÔNG NGHỆ CAO & GIẢ MẠO CƠ QUAN
  {
    id: 'scam-01',
    title: 'Giả danh Công an/Viện kiểm sát dọa án ma túy, rửa tiền',
    category: 'deepfake',
    riskLevel: 'critical',
    date: 'Mới cập nhật',
    source: 'Cục Cảnh sát Hình sự (C02) & NCSC',
    summary: 'Đối tượng gọi điện xưng là cán bộ công an, thông báo số CCCD/tài khoản dính vào đường dây buôn ma túy xuyên quốc gia, ép chuyển tiền vào "tài khoản bảo chứng".',
    tactics: [
      'Gửi Lệnh bắt tạm giam, Lệnh phong tỏa tài sản giả qua Zalo/Telegram.',
      'Yêu cầu nạn nhân vào phòng kín, cấm không được kể cho người thân/con cháu.',
      'Ép chuyển toàn bộ tiền tiết kiệm vào tài khoản ngân hàng của "cán bộ điều tra" để xác minh nguồn gốc.'
    ],
    recommendation: 'CƠ QUAN CÔNG AN KHÔNG BAO GIỜ LÀM VIỆC QUA ĐIỆN THOẠI/ZALO VÀ TUYỆT ĐỐI KHÔNG YÊU CẦU CHUYỂN TIỀN. Bác hãy cúp máy ngay lập tức!',
    reportedCount: 4520,
    targetVictims: 'Người cao tuổi, người về hưu, phụ nữ nội trợ',
    elderAudioGuide: 'Bác ơi, Công an thật không bao giờ gọi điện dọa bắt hay đòi chuyển tiền đâu ạ. Bác hãy dập máy ngay và báo con cháu nhé!'
  },
  {
    id: 'scam-02',
    title: 'Mạo danh Công an phường ép cài App VNeID giả mạo (.apk)',
    category: 'vneid',
    riskLevel: 'critical',
    date: 'Cảnh báo nóng',
    source: 'Bộ Công An (C06)',
    summary: 'Kẻ gian gọi điện bảo tài khoản định danh VNeID mức 2 bị lỗi, gửi link tải app đuôi .apk (như dichvucong-gov.apk) để cướp quyền trợ năng và rút sạch tiền.',
    tactics: [
      'Đọc chính xác tên tuổi, địa chỉ nhà nạn nhân để tạo lòng tin.',
      'Gửi đường link lạ tải file APK thay vì trên Google Play hay App Store.',
      'Yêu cầu cấp quyền "Trợ năng (Accessibility)" để điều khiển điện thoại từ xa.'
    ],
    recommendation: 'Tuyệt đối KHÔNG bấm vào link tải app ngoài kho ứng dụng chính thức. Chỉ cài VNeID trực tiếp từ Google Play / App Store.',
    reportedCount: 6890,
    targetVictims: 'Toàn bộ người dân có CCCD gắn chip',
    elderAudioGuide: 'Công an phường không gửi link cài app qua Zalo đâu ạ. Bác muốn làm định danh hãy ra thẳng trụ sở Công an phường nhé!'
  },
  {
    id: 'scam-03',
    title: 'Cuộc gọi Video Deepfake & Deepvoice giả giọng người thân',
    category: 'deepfake',
    riskLevel: 'critical',
    date: 'Mới cập nhật',
    source: 'Cục An toàn thông tin (Bộ TT&TT)',
    summary: 'Dùng AI sao chép hình ảnh cử động và giọng nói giống hệt con cháu, bạn bè đang ở xa gọi video vài giây dọa đang gặp nạn cần tiền gấp.',
    tactics: [
      'Cuộc gọi chớp nhoáng 5-10 giây rồi viện cớ mạng yếu, sóng chập chờn.',
      'Thúc ép chuyển tiền vào một số tài khoản lạ (lấy lý do mượn tài khoản của bác sĩ hoặc bạn cùng phòng).'
    ],
    recommendation: 'Gọi lại bằng cuộc gọi thông thường (SIM) hoặc gọi video kiểm chứng với câu hỏi bí mật mà chỉ người thân mới biết.',
    reportedCount: 3120,
    targetVictims: 'Cha mẹ có con cái đi du học hoặc làm ăn xa'
  },
  {
    id: 'scam-04',
    title: 'Tin nhắn giả mạo SMS Brandname Ngân hàng (Trạm BTS giả)',
    category: 'fake_bank',
    riskLevel: 'critical',
    date: 'Hôm nay',
    source: 'Hiệp hội Ngân hàng Việt Nam (VNBA)',
    summary: 'Kẻ xấu vác thiết bị phát sóng BTS giả chèn tin nhắn lừa đảo vào đúng luồng tin nhắn chính thức của Vietcombank, Techcombank, BIDV...',
    tactics: [
      'Nội dung tin nhắn: "Tài khoản của bạn vừa đăng nhập ở thiết bị lạ, bấm vào link để hủy".',
      'Đường link giả mạo giao diện ngân hàng để thu thập tên đăng nhập, mật khẩu và mã OTP.'
    ],
    recommendation: 'Ngân hàng không bao giờ gửi link yêu cầu đăng nhập mật khẩu/OTP qua tin nhắn SMS. Không bao giờ bấm vào link trong tin nhắn!',
    reportedCount: 5210,
    targetVictims: 'Người dùng có tài khoản ngân hàng điện tử'
  },
  {
    id: 'scam-05',
    title: 'Làm giả Biên lai chuyển tiền VietQR (Fake Bill)',
    category: 'fake_bank',
    riskLevel: 'high',
    date: 'Thường xuyên',
    source: 'Công an TP. Hà Nội & TP.HCM',
    summary: 'Người mua hàng vào quán ăn, cửa hàng tạp hóa vờ chuyển khoản rồi đưa màn hình "Chuyển tiền thành công" được tạo từ web photoshop giả mạo.',
    tactics: [
      'Giục gói hàng mang đi gấp với lý do bận việc.',
      'Khi chủ quán chưa thấy tiền về, đối tượng giải thích do "khác ngân hàng nên nghẽn mạng".'
    ],
    recommendation: 'CHỈ GIAO HÀNG KHI TÀI KHOẢN NGÂN HÀNG CỦA MÌNH ĐÃ BÁO CỘNG TIỀN THỰC TẾ. Không tin vào ảnh chụp màn hình!',
    reportedCount: 8400,
    targetVictims: 'Chủ cửa hàng, người buôn bán nhỏ, tiểu thương chợ'
  },
  {
    id: 'scam-06',
    title: 'Dọa "Khóa SIM trong 2 giờ" vì chưa chuẩn hóa thông tin',
    category: 'sim_block',
    riskLevel: 'high',
    date: 'Cảnh báo',
    source: 'Cục Viễn thông & Bộ TT&TT',
    summary: 'Gọi điện mạo danh Viettel/VinaPhone/MobiFone dọa thuê bao sắp bị cắt liên lạc nếu không cung cấp số CCCD và mã xác thực OTP.',
    tactics: [
      'Tạo áp lực thời gian: "SIM của quý khách sẽ bị khóa 2 chiều sau 2 giờ nữa".',
      'Dẫn dụ nạn nhân bấm phím điều hướng hoặc kết bạn Zalo để lừa chiếm quyền SIM.'
    ],
    recommendation: 'Nhà mạng không bao giờ gọi điện dọa khóa SIM kiểu này. Muốn kiểm tra SIM, soạn tin nhắn miễn phí: TTTB gửi 1414.',
    reportedCount: 4190,
    targetVictims: 'Người lớn tuổi dùng thuê bao di động lâu năm'
  },

  // GROUP 2: TÀI CHÍNH, ĐẦU TƯ & DẪN DỤ TIỀN BẠC
  {
    id: 'scam-07',
    title: 'Tuyển Cộng tác viên "Việc nhẹ lương cao" làm nhiệm vụ Shopee/TikTok',
    category: 'job_scam',
    riskLevel: 'critical',
    date: 'Rất phổ biến',
    source: 'Cục An toàn thông tin (NCSC)',
    summary: 'Mời làm việc online: Thả tim video, chốt đơn hàng ảo nhận hoa hồng 20-30%. Ban đầu trả 50k-100k thật, sau đó ép nạp tiền triệu để làm "nhiệm vụ VIP".',
    tactics: [
      'Nhiệm vụ 1-2 nạp 100k được rút về 130k ngay để tạo lòng tin tuyệt đối.',
      'Nhiệm vụ tiếp theo yêu cầu nạp 5 triệu, 20 triệu, 100 triệu với lý do "sai cú pháp, nạp thêm để mở khóa quỹ hoàn tiền".'
    ],
    recommendation: 'Không có công việc nào chỉ bấm điện thoại mà kiếm tiền triệu mỗi ngày. Tuyệt đối không nạp tiền cọc làm nhiệm vụ!',
    reportedCount: 12500,
    targetVictims: 'Học sinh sinh viên, mẹ bỉm sữa, người tìm việc online'
  },
  {
    id: 'scam-08',
    title: 'Sàn đầu tư tài chính, chứng khoán quốc tế, tiền ảo cam kết lãi 100%/tháng',
    category: 'crypto_scam',
    riskLevel: 'critical',
    date: 'Nguy hiểm',
    source: 'UBCKNN & Bộ Công An',
    summary: 'Lôi kéo vào nhóm kín Zalo/Telegram có hàng chục "chim mồi" khoe lãi khủng, sau đó can thiệp hệ thống làm cháy tài khoản hoặc khóa rút tiền.',
    tactics: [
      'Khoe hình ảnh xe sang, biệt thự, số dư tài khoản tiền tỷ hàng ngày.',
      'Khi nạn nhân muốn rút vốn, sàn bắt đóng "thuế thu nhập cá nhân 20%" hoặc "phí bảo hiểm rủi ro".'
    ],
    recommendation: 'Việt Nam chưa cấp phép cho bất kỳ sàn giao dịch tiền số hay chứng khoán quốc tế nào. Đừng tin lãi suất phi thực tế!',
    reportedCount: 7800,
    targetVictims: 'Người có tiền nhàn rỗi, người về hưu tìm kênh đầu tư'
  },
  {
    id: 'scam-09',
    title: 'Bẫy App vay tiền online "Tín dụng đen" & Khủng bố danh bạ',
    category: 'job_scam',
    riskLevel: 'high',
    date: 'Phổ biến',
    source: 'Bộ Công An',
    summary: 'Cho vay nhanh không thế chấp nhưng trừ phí dịch vụ cắt cổ (vay 10 triệu thực nhận 6 triệu), sau đó truy cập danh bạ bêu riếu người thân để đòi nợ.',
    tactics: [
      'Bắt buộc cấp quyền truy cập Danh bạ, Hình ảnh và Vị trí trên điện thoại.',
      'Ghép ảnh nhạy cảm của người vay và người thân đăng lên mạng xã hội.'
    ],
    recommendation: 'Chỉ vay vốn tại các Ngân hàng hoặc Công ty Tài chính được Ngân hàng Nhà nước cấp phép hoạt động.',
    reportedCount: 6100,
    targetVictims: 'Người lao động cần tiền gấp, sinh viên'
  },
  {
    id: 'scam-10',
    title: 'Cố ý chuyển tiền nhầm vào tài khoản để "Phạt vạ ép vay nợ"',
    category: 'fake_bank',
    riskLevel: 'high',
    date: 'Mới',
    source: 'Ngân hàng Nhà nước Việt Nam',
    summary: 'Kẻ xấu chuyển vào tài khoản bạn vài triệu, sau đó có người tự xưng là công ty tài chính gọi đòi nợ với lãi suất cắt cổ hoặc giả làm người chuyển nhầm bảo chuyển lại vào STK khác.',
    tactics: [
      'Gửi tin nhắn đe dọa đòi nợ gốc kèm tiền lãi cắt cổ.',
      'Dụ nạn nhân chuyển tiền hoàn trả vào một tài khoản thứ 3 để chiếm đoạt.'
    ],
    recommendation: 'Khi nhận được tiền lạ, TUYỆT ĐỐI KHÔNG SỬ DỤNG. Ra trực tiếp chi nhánh ngân hàng của mình làm việc nhờ tra soát chuyển lại đúng người.',
    reportedCount: 3400,
    targetVictims: 'Mọi chủ tài khoản ngân hàng'
  },

  // GROUP 3: THAO TÚNG TÂM LÝ & TÌNH CẢM
  {
    id: 'scam-11',
    title: 'Lừa đảo "Con đang cấp cứu ở bệnh viện cần tiền mổ gấp"',
    category: 'emergency_kid',
    riskLevel: 'critical',
    date: 'Cực kỳ nguy cấp',
    source: 'Bộ Giáo dục & Đào tạo + Bệnh viện Chợ Rẫy/Việt Đức',
    summary: 'Gọi điện cho phụ huynh trong giờ học, giả danh giáo viên hoặc bác sĩ thông báo con bị ngã chấn thương sọ não đang chờ mổ, ép chuyển viện phí ngay.',
    tactics: [
      'Tạo bối cảnh âm thanh bệnh viện, còi cấp cứu cấp bách gây hoảng loạn tột độ.',
      'Cung cấp STK ngân hàng của "bác sĩ phụ trách" để chuyển tiền tạm ứng mổ.'
    ],
    recommendation: 'HÃY HẾT SỨC BÌNH TĨNH! Gọi ngay cho thầy cô chủ nhiệm hoặc ban giám hiệu nhà trường để kiểm tra trước khi chuyển bất kỳ đồng nào.',
    reportedCount: 4900,
    targetVictims: 'Phụ huynh học sinh các cấp'
  },
  {
    id: 'scam-12',
    title: 'Bẫy tình cảm "Người nước ngoài gửi kiện hàng tiền đô / Hải quan"',
    category: 'gift_trap',
    riskLevel: 'high',
    date: 'Cảnh báo',
    source: 'Cục Hải quan & Công an',
    summary: 'Kết bạn làm quen yêu đương qua Facebook, vờ gửi quà tặng ngoại tệ triệu USD về Việt Nam, sau đó đồng bọn giả danh nhân viên Hải quan/Sân bay đòi phí đóng phạt.',
    tactics: [
      'Nhắn tin yêu đương, tâm sự suốt nhiều tuần để tạo tình cảm gắn bó.',
      'Gửi biên lai bưu kiện giả, yêu cầu chuyển 20-50 triệu phí thông quan.'
    ],
    recommendation: 'Hải quan không thu phí qua tài khoản cá nhân. Không có ai mới quen qua mạng lại tặng bưu kiện tiền tỷ!',
    reportedCount: 3800,
    targetVictims: 'Phụ nữ độc thân, người lớn tuổi thiếu thốn tình cảm'
  },
  {
    id: 'scam-13',
    title: 'Bán "Combo du lịch / Phòng khách sạn / Vé máy bay giá rẻ"',
    category: 'other',
    riskLevel: 'medium',
    date: 'Mùa cao điểm',
    source: 'Hiệp hội Du lịch Việt Nam',
    summary: 'Lập fanpage giả mạo công ty du lịch uy tín, chào mời tour Phú Quốc, Đà Nẵng, Thái Lan giá rẻ bằng 1/3 thị trường, bắt cọc tiền rồi chặn số.',
    tactics: [
      'Chạy quảng cáo Facebook rầm rộ với hàng nghìn lượt like và bình luận ảo.',
      'Hối thúc đặt cọc sớm vì "chỉ còn 2 suất cuối cùng trong ngày".'
    ],
    recommendation: 'Chỉ đặt dịch vụ qua website/ứng dụng chính thức (Traveloka, Agoda, Vietravel...) và kiểm tra giấy phép lữ hành.',
    reportedCount: 5600,
    targetVictims: 'Gia đình, bạn trẻ lên kế hoạch du lịch'
  },
  {
    id: 'scam-14',
    title: 'Giả mạo tài khoản kêu gọi "Từ thiện cứu trợ bão lũ, hoàn cảnh khó khăn"',
    category: 'other',
    riskLevel: 'high',
    date: 'Mùa bão lũ',
    source: 'Ủy ban MTTQ Việt Nam & Bộ Công An',
    summary: 'Sử dụng hình ảnh thương tâm của trẻ em nghèo hoặc bà con vùng lũ, tạo fanpage giả mạo tên của Mặt trận Tổ quốc hoặc người nổi tiếng để nhận tiền từ thiện.',
    tactics: [
      'Lập tài khoản ngân hàng trùng tên với người nổi tiếng hoặc cơ quan nhà nước.',
      'Đăng bài xúc động kêu gọi chuyển khoản khẩn cấp.'
    ],
    recommendation: 'Chỉ chuyển tiền từ thiện vào các tài khoản chính thức được công bố trên Cổng thông tin Chính phủ hoặc Ủy ban MTTQ.',
    reportedCount: 2900,
    targetVictims: 'Người có lòng hảo tâm, các phật tử, người lớn tuổi'
  },
  {
    id: 'scam-15',
    title: 'Lừa đảo "Dịch vụ lấy lại tiền bị lừa / Lấy lại tài khoản Facebook"',
    category: 'blackmail',
    riskLevel: 'critical',
    date: 'Nguy hiểm',
    source: 'Cục An toàn thông tin (NCSC)',
    summary: 'Khi nạn nhân vừa bị lừa tiền, các đối tượng tự xưng là "Luật sư / Chuyên gia an ninh mạng / Hacker mũ trắng" hứa hẹn lấy lại tiền 100% rồi tiếp tục lừa thêm lần 2.',
    tactics: [
      'Yêu cầu nạn nhân đóng "phí hồ sơ truy vết", "phí thanh khoản tài khoản treo".',
      'Đánh vào tâm lý tiếc của và tuyệt vọng của nạn nhân.'
    ],
    recommendation: 'CHỈ CÓ CƠ QUAN CÔNG AN MỚI CÓ THẨM QUYỀN THU HỒI TÀI SẢN PHẠM TỘI. Không ai trên mạng có thể lấy lại tiền hộ bạn!',
    reportedCount: 4700,
    targetVictims: 'Những người vừa bị lừa tiền qua mạng'
  }
];

// -------------------------------------------------------------
// INTERACTIVE DRILLS (MÔ PHỎNG TÌNH HUỐNG THỰC CHIẾN CHO NGƯỜI CAO TUỔI)
// -------------------------------------------------------------
export const INTERACTIVE_DRILLS: InteractiveDrill[] = [
  {
    id: 'drill-01',
    title: 'Tình huống 1: Cuộc gọi tự xưng Công an điều tra vụ án ma túy',
    category: 'Mạo danh Công An',
    callerName: 'Cán bộ Nguyễn Văn Hùng - C02 Bộ Công An',
    callerPhone: '024.3825.xxxx (Số giả mạo)',
    initialDialogue: 'Alo! Có phải bác Tuyên không? Tôi là Trung tá Hùng bên Cơ quan Cảnh sát Điều tra. Số CCCD của bác đang mở tài khoản tại ngân hàng ở Đà Nẵng để nhận 5 tỷ tiền buôn ma túy. Bác phải vào phòng kín đóng cửa lại ngay, không được nói cho con cháu biết nếu không sẽ bị bắt giam tối nay!',
    options: [
      {
        text: 'Hoảng sợ quá, vâng lời vào phòng kín và làm theo hướng dẫn chuyển tiền xác minh',
        isSafe: false,
        feedback: 'NGUY HIỂM CỰC KỲ! Bác đã rơi vào bẫy tâm lý. Đối tượng sẽ ép bác chuyển sạch sổ tiết kiệm vào tài khoản của chúng rồi biến mất!',
        elderAdvice: 'Bác ơi, Công an thật KHÔNG BAO GIỜ gọi điện thoại làm việc hay dọa bắt giam qua điện thoại đâu ạ.'
      },
      {
        text: 'Bình tĩnh nói: "Tôi không làm gì sai. Mời các anh gửi giấy triệu tập về Công an phường sở tại", sau đó cúp máy',
        isSafe: true,
        feedback: 'CHÍNH XÁC 100%! Bác đã xử lý rất chuẩn mực và an toàn tuyệt đối.',
        elderAdvice: 'Bác đã thực hiện đúng quy tắc vàng: Bình tĩnh, cúp máy ngay và hỏi ý kiến người thân.'
      },
      {
        text: 'Xin số tài khoản bảo chứng của họ để ra ngân hàng gửi tiền chứng minh trong sạch',
        isSafe: false,
        feedback: 'SAI HOÀN TOÀN! Nhà nước không có bất kỳ "Tài khoản bảo chứng" nào của cá nhân cả.',
        elderAdvice: 'Mọi yêu cầu chuyển tiền đều là lừa đảo 100%!'
      }
    ]
  },
  {
    id: 'drill-02',
    title: 'Tình huống 2: Người lạ gọi báo "Con bị tai nạn cấp cứu, cần tiền mổ gấp"',
    category: 'Dọa cấp cứu người thân',
    callerName: 'Bác sĩ trực cấp cứu - BV Chợ Rẫy',
    callerPhone: '0912.839.xxx',
    initialDialogue: 'Bác ơi! Cháu là bác sĩ bệnh viện. Con bác vừa bị tai nạn giao thông rất nặng, máu chảy nhiều đang nằm phòng cấp cứu chờ mổ. Bác chuyển gấp 30 triệu tạm ứng viện phí vào STK của bác sĩ để kíp mổ tiến hành ngay, chậm là nguy hiểm tính mạng!',
    options: [
      {
        text: 'Vội vàng mở điện thoại chuyển ngay 30 triệu vì sợ con gặp nguy kịch',
        isSafe: false,
        feedback: 'RẤT NGUY HIỂM! Kẻ gian đang đánh vào tình mẫu tử/phụ tử để khiến bác hoảng loạn không kịp suy nghĩ.',
        elderAdvice: 'Bệnh viện luôn ưu tiên cứu người trước, thủ tục viện phí sau. Không bao giờ bác sĩ dùng STK cá nhân để giục chuyển tiền gấp.'
      },
      {
        text: 'Hít thở sâu, gọi ngay cho số của con hoặc gọi cho thầy cô/đồng nghiệp của con để xác minh',
        isSafe: true,
        feedback: 'XUẤT SẮC! Đây là cách xử lý thông minh nhất để lật tẩy chiêu trò lừa đảo tàn nhẫn này.',
        elderAdvice: 'Luôn kiểm tra chéo với số điện thoại của nhà trường hoặc người thân trước khi tin lời người lạ.'
      }
    ]
  },
  {
    id: 'drill-03',
    title: 'Tình huống 3: Mạo danh Công an giục cài App VNeID cập nhật sinh trắc học',
    category: 'Mã độc VNeID giả mạo',
    callerName: 'Cán bộ Định danh Cảnh sát Phường',
    callerPhone: '0981.234.xxx',
    initialDialogue: 'Bác ơi, hồ sơ VNeID mức 2 của bác bị sai quê quán và thiếu mống mắt, hệ thống sẽ hủy CCCD của bác. Cháu gửi cho bác đường link qua Zalo này: "vneid-chinhphu.apk", bác tải về cài đặt rồi quét khuôn mặt ngay nhé!',
    options: [
      {
        text: 'Bấm vào link tải file APK về điện thoại và cấp hết quyền nó yêu cầu',
        isSafe: false,
        feedback: 'MẤT HẾT TIỀN! File APK này chứa mã độc điều khiển điện thoại từ xa, nó sẽ tự động mở app ngân hàng chuyển sạch tiền trong tài khoản.',
        elderAdvice: 'Tuyệt đối KHÔNG BAO GIỜ bấm link lạ hay cài file APK do người lạ gửi.'
      },
      {
        text: 'Từ chối và nói: "Tôi sẽ ra trực tiếp trụ sở Công an phường để cán bộ hướng dẫn"',
        isSafe: true,
        feedback: 'QUÁ TUYỆT VỜI! Bác đã bảo vệ an toàn tuyệt đối cho điện thoại và tài khoản ngân hàng của mình.',
        elderAdvice: 'Chỉ cài đặt ứng dụng từ Google Play hoặc App Store chính thống.'
      }
    ]
  }
];

// -------------------------------------------------------------
// BLACKLIST DATABASE
// -------------------------------------------------------------
export const INITIAL_BLACKLIST_ACCOUNTS: BlacklistAccount[] = [
  {
    accountNumber: '1029384756',
    bankName: 'Vietcombank',
    accountHolder: 'NGUYEN VAN DUC',
    reportsCount: 412,
    riskLevel: 'danger',
    scamType: 'Giả danh cơ quan công an / Vay online',
    lastReportDate: '15/08/2026',
    verifiedByNCSC: true
  },
  {
    accountNumber: '0987123456',
    bankName: 'MB Bank',
    accountHolder: 'TRAN THI MAI',
    reportsCount: 289,
    riskLevel: 'danger',
    scamType: 'Bẫy tuyển CTV Shopee làm nhiệm vụ nạp cọc',
    lastReportDate: '14/08/2026',
    verifiedByNCSC: true
  },
  {
    accountNumber: '19036789123',
    bankName: 'Techcombank',
    accountHolder: 'LE HOANG PHUC',
    reportsCount: 175,
    riskLevel: 'danger',
    scamType: 'Giả danh bác sĩ báo con cấp cứu viện phí',
    lastReportDate: '15/08/2026',
    verifiedByNCSC: true
  },
  {
    accountNumber: '7890123456',
    bankName: 'VPBank',
    accountHolder: 'HOANG MINH TUAN',
    reportsCount: 94,
    riskLevel: 'warning',
    scamType: 'Bán combo du lịch vé máy bay giá rẻ ảo',
    lastReportDate: '13/08/2026',
    verifiedByNCSC: false
  },
  {
    accountNumber: '5678901234',
    bankName: 'ACB',
    accountHolder: 'PHAM THI HONG',
    reportsCount: 156,
    riskLevel: 'danger',
    scamType: 'Giả mạo nhân viên nhà mạng dọa khóa SIM',
    lastReportDate: '12/08/2026',
    verifiedByNCSC: true
  }
];

// -------------------------------------------------------------
// EMERGENCY CONTACTS
// -------------------------------------------------------------
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: 'Tổng đài An toàn thông tin Quốc gia (NCSC)',
    phone: '1800 6666',
    agency: 'Cục An toàn thông tin - Bộ TT&TT',
    description: 'Tư vấn, hướng dẫn xử lý khẩn cấp khi nghi ngờ bị lừa đảo hoặc bị cài mã độc',
    available: '24/7 Miễn phí cước',
    badgeColor: 'emerald'
  },
  {
    name: 'Cảnh sát Hình sự Toàn quốc (Phòng chống lừa đảo)',
    phone: '113',
    agency: 'Bộ Công An',
    description: 'Tiếp nhận tố giác tội phạm, khẩn cấp phong tỏa khi phát hiện đối tượng lừa đảo',
    available: '24/7 Toàn quốc',
    badgeColor: 'rose'
  },
  {
    name: 'Cục Cảnh sát Hình sự (C02 - Bộ Công An)',
    phone: '069 234 8560',
    agency: 'Cơ quan CSĐT Bộ Công An',
    description: 'Chuyên trách điều tra tội phạm công nghệ cao, lừa đảo chiếm đoạt tài sản quy mô lớn',
    available: 'Giờ hành chính & Khẩn cấp',
    badgeColor: 'amber'
  },
  {
    name: 'Tổng đài Quốc gia Bảo vệ Trẻ em',
    phone: '111',
    agency: 'Bộ Lao động - Thương binh & Xã hội',
    description: 'Bảo vệ học sinh, trẻ em trước bẫy lừa đảo mạng và bắt cóc online',
    available: '24/7 Miễn phí',
    badgeColor: 'cyan'
  }
];

// -------------------------------------------------------------
// QUIZ QUESTIONS FOR ELDERLY & CITIZENS
// -------------------------------------------------------------
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Khi nhận được cuộc gọi từ người tự xưng là Công an, thông báo bạn dính vào đường dây rửa tiền và yêu cầu chuyển tiền vào "tài khoản bảo chứng", bạn nên làm gì?',
    scenario: 'Cuộc gọi tự xưng Thượng úy Công an TP. Hà Nội, gửi lệnh bắt tạm giam qua Zalo.',
    senderOrCaller: '024.3825.xxxx (Số lạ xưng Công an)',
    options: [
      { id: 'a', text: 'Vội vàng chuyển tiền ngay để chứng minh mình vô tội', isCorrect: false },
      { id: 'b', text: 'Cúp máy ngay lập tức, không chuyển tiền và ra Công an phường xác minh', isCorrect: true },
      { id: 'c', text: 'Làm theo hướng dẫn vào phòng kín nói chuyện một mình', isCorrect: false },
      { id: 'd', text: 'Cung cấp số tài khoản và mật khẩu ngân hàng cho họ kiểm tra', isCorrect: false }
    ],
    explanation: 'Cơ quan Công an, Viện kiểm sát, Tòa án KHÔNG BAO GIỜ làm việc qua điện thoại hay Zalo và tuyệt đối KHÔNG BAO GIỜ yêu cầu người dân chuyển tiền vào tài khoản cá nhân!',
    elderTip: 'Bác hãy nhớ: Cứ ai gọi điện đòi chuyển tiền đều là quân lừa đảo, cúp máy ngay nhé!'
  },
  {
    id: 'q2',
    question: 'Có tin nhắn SMS gửi đến với tên người gửi đúng là tên Ngân hàng của bạn, nội dung: "Tài khoản bị khóa, bấm vào link www.vietcombank-login.xyz để mở lại". Bạn nên làm gì?',
    scenario: 'Tin nhắn mạo danh Brandname qua trạm BTS giả.',
    senderOrCaller: 'Vietcombank (Mạo danh)',
    options: [
      { id: 'a', text: 'Bấm ngay vào đường link để nhập mật khẩu và mã OTP mở khóa', isCorrect: false },
      { id: 'b', text: 'Tuyệt đối không bấm vào link, mở app ngân hàng chính thức kiểm tra hoặc gọi hotline ngân hàng', isCorrect: true },
      { id: 'c', text: 'Chuyển tiếp tin nhắn cho bạn bè bấm thử', isCorrect: false }
    ],
    explanation: 'Đây là thủ đoạn phát sóng BTS giả mạo Brandname. Ngân hàng không bao giờ gửi link yêu cầu nhập mật khẩu hay mã OTP qua SMS.',
    elderTip: 'Không bấm vào bất cứ đường link màu xanh nào trong tin nhắn gửi đến điện thoại!'
  },
  {
    id: 'q3',
    question: 'Một người quen nhắn tin qua Facebook/Zalo nhờ bạn chuyển khoản gấp 10 triệu vì "tài khoản ngân hàng của họ bị lỗi", bạn nên làm gì?',
    scenario: 'Tài khoản bạn bè bị hack hoặc bị làm giả video Deepfake.',
    senderOrCaller: 'Facebook của bạn thân',
    options: [
      { id: 'a', text: 'Chuyển tiền ngay vì tin tưởng bạn bè thân thiết', isCorrect: false },
      { id: 'b', text: 'Gọi điện thoại trực tiếp bằng số SIM di động thông thường cho người đó để hỏi rõ', isCorrect: true },
      { id: 'c', text: 'Chỉ nhắn tin qua Facebook hỏi xem có đúng không', isCorrect: false }
    ],
    explanation: 'Tài khoản mạng xã hội của người bạn đó có thể đã bị hacker chiếm quyền. Phải gọi điện thoại SIM để kiểm chứng giọng nói thật.',
    elderTip: 'Ai hỏi mượn tiền qua mạng, bác cứ gọi số điện thoại thông thường để nghe giọng nói thật nhé!'
  }
];

export const SECURITY_ARTICLES: SecurityArticle[] = [
  {
    id: 'art-01',
    title: 'Cẩm nang Quy tắc "3 KHÔNG - 3 BẢO ĐẢM" chống lừa đảo cho mọi gia đình',
    category: 'Cẩm nang cốt lõi',
    readTime: '2 phút đọc',
    iconName: 'ShieldCheck',
    summary: 'Bộ quy tắc ngắn gọn, dễ nhớ nhất được Cục An toàn thông tin (Bộ TT&TT) khuyến nghị cho toàn thể nhân dân.',
    content: [
      '1. KHÔNG TIN: Không tin vào các lời mời chào "việc nhẹ lương cao", các sàn đầu tư siêu lợi nhuận 100% hay các cuộc gọi đe dọa từ người tự xưng là công an, viện kiểm sát.',
      '2. KHÔNG TẢI - KHÔNG BẤM: Không bấm vào các đường link lạ gửi qua tin nhắn/Zalo. Tuyệt đối không cài đặt các tệp tin đuôi .apk ngoài kho ứng dụng chính thức (Google Play / App Store).',
      '3. KHÔNG CHIA SẺ: Không bao giờ cung cấp mã OTP, mật khẩu ngân hàng, số CCCD, hình ảnh khuôn mặt hoặc thông tin sinh trắc học cho bất kỳ ai, kể cả người tự xưng là nhân viên ngân hàng hay công an.',
      '4. BẢO ĐẢM XÁC THỰC: Luôn kiểm tra chéo bằng cuộc gọi trực tiếp khi có người thân hỏi vay tiền gấp.',
      '5. BẢO ĐẢM BÌNH TĨNH: Khi gặp thông tin đe dọa con cái cấp cứu hoặc dọa bắt giam, hít thở sâu và liên hệ ngay với cơ quan chức năng hoặc người thân.',
      '6. BẢO ĐẢM TỐ GIÁC: Báo cáo ngay số tài khoản, số điện thoại lừa đảo cho cơ quan công an hoặc tổng đài 1800 6666.'
    ],
    keyRules: [
      'Không đọc OTP cho bất kỳ ai',
      'Không tải file APK lạ',
      'Không chuyển tiền theo lệnh qua điện thoại'
    ]
  },
  {
    id: 'art-02',
    title: 'Quy trình "30 phút Vàng" cần làm ngay khi lỡ bấm vào link hoặc chuyển tiền lừa đảo',
    category: 'Cứu hộ khẩn cấp',
    readTime: '1 phút đọc',
    iconName: 'AlertTriangle',
    summary: 'Các bước hành động tức thì để ngăn chặn mất tiền hoặc giảm thiểu thiệt hại tối đa.',
    content: [
      'Bước 1: BẬT CHẾ ĐỘ MÁY BAY NGAY LẬP TỨC nếu bạn vừa cài file APK lạ (nhằm ngắt kết nối mạng, ngăn hacker điều khiển máy từ xa).',
      'Bước 2: GỌI TỔNG ĐÀI NGÂN HÀNG KHẨN CẤP yêu cầu khóa ngay dịch vụ Internet Banking, khóa thẻ ATM/Visa để đối tượng không kịp chuyển tiền đi.',
      'Bước 3: Đổi mật khẩu ngân hàng và mật khẩu email trên một thiết bị an toàn khác.',
      'Bước 4: Đến ngay Công an phường/xã gần nhất và cung cấp sao kê giao dịch, số tài khoản nhận tiền của kẻ lừa đảo để phục vụ công tác phong tỏa dòng tiền.'
    ],
    keyRules: [
      'Bật chế độ máy bay ngắt mạng',
      'Khóa tài khoản ngân hàng lập tức',
      'Báo Công an để phong tỏa dòng tiền'
    ]
  }
];

// -------------------------------------------------------------
// 20+ VIETNAMESE BANKS EMERGENCY FREEZE HOTLINES (24/7)
// -------------------------------------------------------------
export const VIETNAM_BANKS_HOTLINES: {
  code: string;
  name: string;
  shortName: string;
  hotline: string;
  secondaryHotline?: string;
  emergencyLockMethod: string;
  appLockSteps: string[];
  logoBg: string;
  logoUrl: string;
}[] = [
  {
    code: 'VCB',
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    shortName: 'Vietcombank',
    hotline: '1900545413',
    secondaryHotline: '02438243524',
    emergencyLockMethod: 'Soạn tin nhắn VCB KHOATHE gửi 6167 hoặc gọi 1900545413 bấm phím 1',
    appLockSteps: ['Đăng nhập VCB Digibank', 'Cài đặt', 'Quản lý dịch vụ thẻ', 'Khóa thẻ khẩn cấp'],
    logoBg: 'bg-emerald-600',
    logoUrl: 'https://api.vietqr.io/img/VCB.png'
  },
  {
    code: 'MB',
    name: 'Ngân hàng TMCP Quân đội',
    shortName: 'MB Bank',
    hotline: '1900545426',
    secondaryHotline: '02437674050',
    emergencyLockMethod: 'Gọi 1900545426 bấm phím 1 để khóa tự động bằng IVR',
    appLockSteps: ['Vào App MBBank', 'Dịch vụ thẻ', 'Chọn thẻ cần khóa', 'Bật "Khóa thẻ"'],
    logoBg: 'bg-blue-600',
    logoUrl: 'https://api.vietqr.io/img/MB.png'
  },
  {
    code: 'TCB',
    name: 'Ngân hàng TMCP Kỹ thương Việt Nam',
    shortName: 'Techcombank',
    hotline: '1800588822',
    secondaryHotline: '02439446699',
    emergencyLockMethod: 'Tổng đài miễn cước 1800 588 822 hoạt động 24/7',
    appLockSteps: ['Mở Techcombank Mobile', 'Tài khoản & Thẻ', 'Cài đặt thẻ', 'Khóa thẻ ngay'],
    logoBg: 'bg-rose-600',
    logoUrl: 'https://api.vietqr.io/img/TCB.png'
  },
  {
    code: 'BIDV',
    name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    shortName: 'BIDV',
    hotline: '19009247',
    secondaryHotline: '02422200588',
    emergencyLockMethod: 'Gọi 19009247 bấm phím 1 (khóa thẻ khẩn cấp tự động)',
    appLockSteps: ['Vào BIDV SmartBanking', 'Dịch vụ Thẻ', 'Khóa/Mở khóa thẻ'],
    logoBg: 'bg-teal-700',
    logoUrl: 'https://api.vietqr.io/img/BIDV.png'
  },
  {
    code: 'VBA',
    name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn',
    shortName: 'Agribank',
    hotline: '1900558818',
    secondaryHotline: '02432192089',
    emergencyLockMethod: 'Soạn VBA KHOATHE [4 số cuối] gửi 8149 hoặc gọi 1900558818',
    appLockSteps: ['Mở Agribank E-Mobile', 'Dịch vụ thẻ', 'Khóa thẻ tạm thời'],
    logoBg: 'bg-red-800',
    logoUrl: 'https://api.vietqr.io/img/VBA.png'
  },
  {
    code: 'CTG',
    name: 'Ngân hàng TMCP Công thương Việt Nam',
    shortName: 'VietinBank',
    hotline: '1900558868',
    secondaryHotline: '02439418868',
    emergencyLockMethod: 'Soạn CTG KHOATHE [4 số cuối] gửi 8149 hoặc gọi 1900558868',
    appLockSteps: ['Vào VietinBank iPay', 'Dịch vụ thẻ', 'Gạt sang chế độ Khóa thẻ'],
    logoBg: 'bg-sky-700',
    logoUrl: 'https://api.vietqr.io/img/ICB.png'
  },
  {
    code: 'VPB',
    name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
    shortName: 'VPBank',
    hotline: '1900545415',
    secondaryHotline: '02439288880',
    emergencyLockMethod: 'Gọi 1900545415 nhánh 1 để khóa thẻ tự động 24/7',
    appLockSteps: ['Vào VPBank NEO', 'Tiện ích', 'Khóa tài khoản / Khóa thẻ'],
    logoBg: 'bg-emerald-500',
    logoUrl: 'https://api.vietqr.io/img/VPB.png'
  },
  {
    code: 'ACB',
    name: 'Ngân hàng TMCP Á Châu',
    shortName: 'ACB',
    hotline: '1900545486',
    secondaryHotline: '02838247247',
    emergencyLockMethod: 'Gọi 1900545486 nhấn phím 1 để khóa thẻ ngay',
    appLockSteps: ['Vào ACB ONE', 'Thẻ', 'Tùy chọn', 'Khóa thẻ tức thì'],
    logoBg: 'bg-blue-700',
    logoUrl: 'https://api.vietqr.io/img/ACB.png'
  },
  {
    code: 'TPB',
    name: 'Ngân hàng TMCP Tiên Phong',
    shortName: 'TPBank',
    hotline: '1900585885',
    secondaryHotline: '02437683683',
    emergencyLockMethod: 'Gọi 1900585885 phím 1 hoặc thao tác trên App TPBank',
    appLockSteps: ['Vào App TPBank', 'Quản lý thẻ', 'Khóa thẻ'],
    logoBg: 'bg-purple-700',
    logoUrl: 'https://api.vietqr.io/img/TPB.png'
  },
  {
    code: 'STB',
    name: 'Ngân hàng TMCP Sài Gòn Thương Tín',
    shortName: 'Sacombank',
    hotline: '1800585888',
    secondaryHotline: '02835266060',
    emergencyLockMethod: 'Tổng đài miễn cước 1800 5858 88 hoặc soạn STB KHOA [4 số cuối] gửi 8149',
    appLockSteps: ['Vào Sacombank Pay', 'Quản lý thẻ', 'Khóa thẻ'],
    logoBg: 'bg-blue-800',
    logoUrl: 'https://api.vietqr.io/img/STB.png'
  },
  {
    code: 'OCB',
    name: 'Ngân hàng TMCP Phương Đông',
    shortName: 'OCB',
    hotline: '18006678',
    secondaryHotline: '02836226678',
    emergencyLockMethod: 'Tổng đài miễn cước 1800 6678',
    appLockSteps: ['Vào OCB OMNI', 'Dịch vụ thẻ', 'Khóa thẻ'],
    logoBg: 'bg-green-700',
    logoUrl: 'https://api.vietqr.io/img/OCB.png'
  },
  {
    code: 'VIB',
    name: 'Ngân hàng TMCP Quốc Tế Việt Nam',
    shortName: 'VIB',
    hotline: '18008180',
    secondaryHotline: '02462760068',
    emergencyLockMethod: 'Tổng đài miễn cước 1800 8180 (phím 1)',
    appLockSteps: ['Vào MyVIB', 'Dịch vụ thẻ', 'Khóa thẻ khẩn cấp'],
    logoBg: 'bg-amber-600',
    logoUrl: 'https://api.vietqr.io/img/VIB.png'
  },
  {
    code: 'HDB',
    name: 'Ngân hàng TMCP Phát triển TP.HCM',
    shortName: 'HDBank',
    hotline: '19006060',
    secondaryHotline: '02839365555',
    emergencyLockMethod: 'Gọi 19006060 phím 1 khóa khẩn cấp',
    appLockSteps: ['Vào HDBank Mobile', 'Thẻ', 'Khóa thẻ'],
    logoBg: 'bg-yellow-600',
    logoUrl: 'https://api.vietqr.io/img/HDB.png'
  },
  {
    code: 'MSB',
    name: 'Ngân hàng TMCP Hàng Hải Việt Nam',
    shortName: 'MSB',
    hotline: '19006083',
    secondaryHotline: '02439445566',
    emergencyLockMethod: 'Gọi 19006083 hoặc khóa trực tiếp trên app MSB mBank',
    appLockSteps: ['Vào MSB mBank', 'Dịch vụ thẻ', 'Khóa thẻ'],
    logoBg: 'bg-orange-600',
    logoUrl: 'https://api.vietqr.io/img/MSB.png'
  },
  {
    code: 'SHB',
    name: 'Ngân hàng TMCP Sài Gòn - Hà Nội',
    shortName: 'SHB',
    hotline: '1900588856',
    secondaryHotline: '02462754332',
    emergencyLockMethod: 'Gọi 1900588856 nhấn phím 1 khóa thẻ tự động 24/7',
    appLockSteps: ['Vào SHB Mobile', 'Dịch vụ thẻ', 'Khóa thẻ'],
    logoBg: 'bg-orange-700',
    logoUrl: 'https://api.vietqr.io/img/SHB.png'
  },
  {
    code: 'SEAB',
    name: 'Ngân hàng TMCP Đông Nam Á',
    shortName: 'SeABank',
    hotline: '1900555587',
    secondaryHotline: '02439448702',
    emergencyLockMethod: 'Gọi 1900555587 hoặc thao tác trên SeAMobile',
    appLockSteps: ['Vào SeAMobile', 'Cài đặt thẻ', 'Khóa thẻ'],
    logoBg: 'bg-red-700',
    logoUrl: 'https://api.vietqr.io/img/SEAB.png'
  },
  {
    code: 'LPB',
    name: 'Ngân hàng TMCP Lộc Phát Việt Nam (LPBank)',
    shortName: 'LPBank',
    hotline: '1800577758',
    secondaryHotline: '02462668668',
    emergencyLockMethod: 'Tổng đài miễn phí 1800 577 758',
    appLockSteps: ['Vào LPBank Mobile', 'Quản lý thẻ', 'Khóa thẻ'],
    logoBg: 'bg-yellow-700',
    logoUrl: 'https://api.vietqr.io/img/LPB.png'
  },
  {
    code: 'MOMO',
    name: 'Ví điện tử MoMo',
    shortName: 'MoMo',
    hotline: '1900545441',
    secondaryHotline: '02839917199',
    emergencyLockMethod: 'Gọi 1900545441 phím 1 để khóa tài khoản ví tự động',
    appLockSteps: ['Mở MoMo', 'Tôi', 'Bảo mật tài khoản', 'Khóa tài khoản tạm thời'],
    logoBg: 'bg-pink-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'
  },
  {
    code: 'VTM',
    name: 'Viettel Money',
    shortName: 'Viettel Money',
    hotline: '18009000',
    secondaryHotline: '02462555888',
    emergencyLockMethod: 'Tổng đài miễn phí 1800 9000 (phím 1 để khóa khẩn cấp)',
    appLockSteps: ['Mở Viettel Money', 'Cá nhân', 'Cài đặt bảo mật', 'Khóa tài khoản'],
    logoBg: 'bg-red-600',
    logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Viettel-Money-V.png'
  }
];

// -------------------------------------------------------------
// TELECOM & SATELLITE THREAT PREFIX DATABASE
// -------------------------------------------------------------
export const THREAT_PHONE_DATABASE = [
  {
    prefix: '+224',
    country: 'Guinea (Châu Phi)',
    type: 'Vệ tinh hút cước Wangiri',
    riskLevel: 'DANGER' as const,
    threatScore: 99,
    description: 'Đầu số gọi nhỡ nửa đêm dụ người dùng gọi lại để trừ cước từ 50.000đ - 150.000đ/phút.'
  },
  {
    prefix: '+231',
    country: 'Liberia',
    type: 'Vệ tinh quốc tế',
    riskLevel: 'DANGER' as const,
    threatScore: 99,
    description: 'Chiêu trò nháy máy 1 chuông dụ nạn nhân gọi lại.'
  },
  {
    prefix: '+252',
    country: 'Somalia',
    type: 'Đầu số quốc tế lừa đảo',
    riskLevel: 'DANGER' as const,
    threatScore: 98,
    description: 'Chuyên gửi tin nhắn trúng thưởng ngoại tệ hoặc nháy máy cước cao.'
  },
  {
    prefix: '+247',
    country: 'Ascension Island',
    type: 'Đảo quốc tế hút cước',
    riskLevel: 'DANGER' as const,
    threatScore: 99,
    description: 'Tuyệt đối KHÔNG gọi lại bất kỳ cuộc gọi nhỡ nào từ đầu số +247.'
  },
  {
    prefix: '+881',
    country: 'Hệ thống Vệ tinh Toàn cầu (Globalstar)',
    type: 'Cước vệ tinh siêu đắt',
    riskLevel: 'DANGER' as const,
    threatScore: 100,
    description: 'Cước phí có thể lên tới 250.000đ/phút. Không gọi lại!'
  },
  {
    prefix: '024.xxx / 028.xxx',
    country: 'Tổng đài VoIP ảo không chính chủ',
    type: 'Mạo danh Công an / Tòa án / Thuế',
    riskLevel: 'SUSPICIOUS' as const,
    threatScore: 85,
    description: 'Đối tượng dùng tổng đài ảo tự động gọi thông báo phạt nguội hoặc dọa khóa thuê bao trong 2 tiếng.'
  },
  {
    prefix: '1900.xxxx',
    country: 'Đầu số thu cước tư nhân',
    type: 'Mạo danh Tổng đài Điện lực / Hàng không',
    riskLevel: 'SUSPICIOUS' as const,
    threatScore: 80,
    description: 'Mạo danh hotline đổi vé máy bay hoặc hoàn tiền điện lực với cước gọi 8.000đ - 15.000đ/phút.'
  }
];

// -------------------------------------------------------------
// "THẺ AN TOÀN SỐ BỎ TÚI" (6 LỜI DẶN CHO ÔNG BÀ & GIA ĐÌNH)
// -------------------------------------------------------------
export const POCKET_SAFETY_CARD_RULES = [
  {
    number: '01',
    title: 'CÔNG AN KHÔNG GỌI ĐIỆN DỌA BẮT',
    subtitle: 'Không làm việc qua Zalo, không đòi chuyển tiền vào tài khoản bảo chứng',
    color: 'from-rose-500/20 to-rose-950/40 border-rose-500/40 text-rose-400'
  },
  {
    number: '02',
    title: 'KHÔNG CÀI FILE .APK LẠ',
    subtitle: 'VNeID hay Dịch vụ công chỉ cài trực tiếp trên Google Play / App Store',
    color: 'from-amber-500/20 to-amber-950/40 border-amber-500/40 text-amber-400'
  },
  {
    number: '03',
    title: 'KHÔNG ĐỌC MÃ OTP CHO BẤT KỲ AI',
    subtitle: 'Mã OTP là chìa khóa két sắt. Kể cả nhân viên ngân hàng cũng không có quyền hỏi',
    color: 'from-cyan-500/20 to-cyan-950/40 border-cyan-500/40 text-cyan-400'
  },
  {
    number: '04',
    title: 'HỎI MƯỢN TIỀN: GỌI LẠI SỐ SIM THẬT',
    subtitle: 'Video Call có thể bị làm giả bằng Deepfake AI. Gọi ngay số di động thường để kiểm chứng',
    color: 'from-purple-500/20 to-purple-950/40 border-purple-500/40 text-purple-400'
  },
  {
    number: '05',
    title: 'BÁO CON CẤP CỨU: GỌI TRƯỜNG & VIỆN',
    subtitle: 'Bình tĩnh gọi ngay cho giáo viên chủ nhiệm hoặc số đường dây nóng bệnh viện',
    color: 'from-emerald-500/20 to-emerald-950/40 border-emerald-500/40 text-emerald-400'
  },
  {
    number: '06',
    title: 'CHỈ GIAO HÀNG KHI APP BÁO CỘNG TIỀN',
    subtitle: 'Không tin ảnh chụp "Chuyển tiền thành công" vì rất dễ làm giả bằng web photoshop',
    color: 'from-blue-500/20 to-blue-950/40 border-blue-500/40 text-blue-400'
  }
];

// -------------------------------------------------------------
// LIVE CYBER THREAT MAP (BẢN ĐỒ TỘI PHẠM MẠNG THEO TỈNH THÀNH)
// -------------------------------------------------------------
export const SAMPLE_PROVINCE_THREATS = [
  { code: 'HN', name: 'Hà Nội', region: 'Bắc' as const, threatCount: 1420, primaryThreat: 'Mạo danh Công an / Trạm BTS giả', alertLevel: 'high' as const },
  { code: 'HCM', name: 'TP. Hồ Chí Minh', region: 'Nam' as const, threatCount: 2150, primaryThreat: 'Fake Bill VietQR / App VNeID giả', alertLevel: 'high' as const },
  { code: 'DN', name: 'Đà Nẵng', region: 'Trung' as const, threatCount: 680, primaryThreat: 'Lừa đảo tour du lịch / Vé máy bay', alertLevel: 'medium' as const },
  { code: 'HP', name: 'Hải Phòng', region: 'Bắc' as const, threatCount: 540, primaryThreat: 'Tuyển CTV làm nhiệm vụ Shopee/TikTok', alertLevel: 'medium' as const },
  { code: 'BD', name: 'Bình Dương', region: 'Nam' as const, threatCount: 890, primaryThreat: 'Tín dụng đen online / Bẫy vay tiền', alertLevel: 'high' as const },
  { code: 'DNAI', name: 'Đồng Nai', region: 'Nam' as const, threatCount: 710, primaryThreat: 'Giả danh sàn thương mại điện tử tặng quà', alertLevel: 'medium' as const },
  { code: 'CT', name: 'Cần Thơ', region: 'Nam' as const, threatCount: 420, primaryThreat: 'Mạo danh con cháu ở xa mượn tiền', alertLevel: 'low' as const },
  { code: 'NA', name: 'Nghệ An', region: 'Trung' as const, threatCount: 630, primaryThreat: 'Dọa khóa thuê bao SIM 2 giờ', alertLevel: 'medium' as const },
  { code: 'TH', name: 'Thanh Hóa', region: 'Trung' as const, threatCount: 580, primaryThreat: 'Bẫy sàn chứng khoán quốc tế / Forex', alertLevel: 'medium' as const },
  { code: 'QN', name: 'Quảng Ninh', region: 'Bắc' as const, threatCount: 390, primaryThreat: 'Chiếm đoạt tài khoản Facebook/Zalo', alertLevel: 'low' as const }
];

// -------------------------------------------------------------
// FAMILY GUARDIAN NETWORK (VÒNG TRÒN BẢO VỆ GIA ĐÌNH)
// -------------------------------------------------------------
export const SAMPLE_FAMILY_GUARDIANS = [
  {
    id: 'fam-1',
    name: 'Bà Nội (Nguyễn Thị Mai - 76 tuổi)',
    relationship: 'Bà nội',
    phone: '0912.345.xxx',
    avatarColor: 'from-amber-400 to-orange-500',
    isProtected: true,
    status: 'safe' as const,
    lastChecked: 'Vừa xong',
    threatsInterceptedToday: 2
  },
  {
    id: 'fam-2',
    name: 'Mẹ (Trần Thị Lan - 54 tuổi)',
    relationship: 'Mẹ',
    phone: '0988.765.xxx',
    avatarColor: 'from-rose-400 to-pink-500',
    isProtected: true,
    status: 'safe' as const,
    lastChecked: '5 phút trước',
    threatsInterceptedToday: 1
  },
  {
    id: 'fam-3',
    name: 'Bố (Hoàng Văn Dũng - 58 tuổi)',
    relationship: 'Bố',
    phone: '0903.112.xxx',
    avatarColor: 'from-cyan-400 to-blue-500',
    isProtected: true,
    status: 'safe' as const,
    lastChecked: '12 phút trước',
    threatsInterceptedToday: 0
  }
];

