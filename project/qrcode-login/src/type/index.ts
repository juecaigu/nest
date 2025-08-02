enum QrcodeStatus {
  NO_SCAN = 'no_scan',
  SCANNED = 'scanned',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

interface QrcodeResult {
  qrcode_id: string;
  url: string;
  status: QrcodeStatus;
}

export { QrcodeStatus, QrcodeResult };
