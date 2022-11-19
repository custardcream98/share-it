const koDtf = new Intl.DateTimeFormat("ko");

/**
 * timestamp를 받아 한국 시간 포멧으로 리턴
 */
export default (timestamp: number) =>
  koDtf
    .format(new Date(timestamp))
    .replaceAll(". ", "-")
    .replace(".", "");
