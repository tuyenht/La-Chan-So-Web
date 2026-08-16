// Utility to generate a high-resolution infographic image of the Pocket Safety Card for sharing and wallpaper
export async function generateSafetyCardPosterBlob(): Promise<{ blob: Blob; dataUrl: string }> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920; // 9:16 ratio ideal for phone wallpaper and mobile sharing (Zalo/Messenger/Story)
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#030712'); // slate-950
  bgGrad.addColorStop(0.3, '#0b1329');
  bgGrad.addColorStop(0.7, '#081726');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Background glow accents
  const glow1 = ctx.createRadialGradient(540, 300, 50, 540, 300, 500);
  glow1.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
  glow1.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, 1080, 800);

  const glow2 = ctx.createRadialGradient(540, 1600, 50, 540, 1600, 450);
  glow2.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
  glow2.addColorStop(1, 'rgba(16, 185, 129, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 1200, 1080, 720);

  // Outer Border
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, 1020, 1860);

  // 2. Header
  // Badge
  ctx.fillStyle = '#06b6d4';
  roundRect(ctx, 390, 80, 300, 48, 24);
  ctx.fill();

  ctx.fillStyle = '#020617';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LÁ CHẮN SỐ QUỐC GIA', 540, 113);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('6 LỜI DẶN AN TOÀN BỎ TÚI', 540, 185);

  // Subtitle
  ctx.fillStyle = '#67e8f9';
  ctx.font = '500 26px system-ui, -apple-system, sans-serif';
  ctx.fillText('Dành cho Ông Bà, Bố Mẹ & Người Thân trong Gia Đình', 540, 230);

  // 3. 6 Rules Cards
  const rules = [
    {
      num: '01',
      title: 'CÔNG AN KHÔNG GỌI ĐIỆN DỌA BẮT',
      desc: 'Cơ quan Công an & Viện Kiểm sát không làm việc qua Zalo, điện thoại và TUYỆT ĐỐI không yêu cầu chuyển tiền vào tài khoản bảo chứng.',
      border: '#ef4444',
      bgStart: 'rgba(239, 68, 68, 0.15)',
      bgEnd: 'rgba(15, 23, 42, 0.95)'
    },
    {
      num: '02',
      title: 'TUYỆT ĐỐI KHÔNG CÀI FILE .APK LẠ',
      desc: 'Không tải file APK "Dịch vụ công", "VNeID giả", "Bộ Công An" qua link gửi trong tin nhắn. Chỉ tải app từ Google Play / App Store.',
      border: '#f97316',
      bgStart: 'rgba(249, 115, 22, 0.15)',
      bgEnd: 'rgba(15, 23, 42, 0.95)'
    },
    {
      num: '03',
      title: 'KHÔNG BAO GIỜ ĐỌC MÃ OTP CHO BẤT KỲ AI',
      desc: 'Mã OTP là chìa khóa két sắt cá nhân. Ngân hàng và tổng đài viên thật không bao giờ yêu cầu khách hàng cung cấp mã OTP.',
      border: '#eab308',
      bgStart: 'rgba(234, 179, 8, 0.15)',
      bgEnd: 'rgba(15, 23, 42, 0.95)'
    },
    {
      num: '04',
      title: 'HỎI MƯỢN TIỀN: GỌI LẠI SỐ ĐT THƯỜNG',
      desc: 'Tin nhắn mượn tiền hoặc video call có thể bị làm giả bằng Deepfake AI. Luôn gọi vào số SIM di động thường để kiểm chứng lại.',
      border: '#a855f7',
      bgStart: 'rgba(168, 85, 247, 0.15)',
      bgEnd: 'rgba(15, 23, 42, 0.95)'
    },
    {
      num: '05',
      title: 'BÁO CON CẤP CỨU: GỌI TRƯỜNG & VIỆN',
      desc: 'Giữ bình tĩnh, không chuyển tiền ngay. Gọi điện trực tiếp cho giáo viên chủ nhiệm, nhà trường hoặc đường dây nóng bệnh viện để xác thực.',
      border: '#10b981',
      bgStart: 'rgba(16, 185, 129, 0.15)',
      bgEnd: 'rgba(15, 23, 42, 0.95)'
    },
    {
      num: '06',
      title: 'CHỈ GIAO HÀNG KHI APP BÁO CỘNG TIỀN',
      desc: 'Không tin ảnh chụp màn hình "Chuyển khoản thành công" vì rất dễ làm giả bằng web Photoshop. Chỉ tin số dư trong ứng dụng của mình.',
      border: '#06b6d4',
      bgStart: 'rgba(6, 182, 212, 0.15)',
      bgEnd: 'rgba(15, 23, 42, 0.95)'
    }
  ];

  let currentY = 280;
  const cardWidth = 960;
  const cardHeight = 185;
  const cardGap = 26;
  const startX = 60;

  rules.forEach((rule) => {
    // Card background gradient
    const cardGrad = ctx.createLinearGradient(startX, currentY, startX + cardWidth, currentY + cardHeight);
    cardGrad.addColorStop(0, rule.bgStart);
    cardGrad.addColorStop(1, rule.bgEnd);
    ctx.fillStyle = cardGrad;
    roundRect(ctx, startX, currentY, cardWidth, cardHeight, 20);
    ctx.fill();

    // Card border
    ctx.strokeStyle = rule.border;
    ctx.lineWidth = 2;
    roundRect(ctx, startX, currentY, cardWidth, cardHeight, 20);
    ctx.stroke();

    // Number Badge
    ctx.fillStyle = '#0f172a';
    roundRect(ctx, startX + 22, currentY + 28, 64, 64, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, startX + 22, currentY + 28, 64, 64, 16);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(rule.num, startX + 54, currentY + 70);

    // Rule Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 27px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(rule.title, startX + 105, currentY + 56);

    // Rule Desc (wrapped text)
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 22px system-ui, -apple-system, sans-serif';
    wrapText(ctx, rule.desc, startX + 105, currentY + 98, 810, 32);

    currentY += cardHeight + cardGap;
  });

  // 4. Footer SOS Hotline Bar
  currentY += 15;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  roundRect(ctx, startX, currentY, cardWidth, 190, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
  ctx.lineWidth = 2;
  roundRect(ctx, startX, currentY, cardWidth, 190, 24);
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🚨 ĐƯỜNG DÂY NÓNG KHẨN CẤP TOÀN QUỐC (MIỄN PHÍ 24/7)', 540, currentY + 45);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 32px system-ui, -apple-system, sans-serif';
  ctx.fillText('NCSC: 1800 6666  |  CẢNH SÁT: 113  |  KHÓA THẺ: TỔNG ĐÀI NH', 540, currentY + 98);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 20px system-ui, -apple-system, sans-serif';
  ctx.fillText('Cài đặt làm hình nền điện thoại hoặc in dán tại góc làm việc/bàn ăn', 540, currentY + 145);

  // 5. Convert to Blob and DataURL
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const dataUrl = canvas.toDataURL('image/png');
        resolve({ blob, dataUrl });
      } else {
        reject(new Error('Failed to generate image blob'));
      }
    }, 'image/png');
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
