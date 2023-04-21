export const toZenkaku = (t: string) =>
  t.replace(/[A-Za-z0-9]/g, (x) =>
    String.fromCharCode(x.charCodeAt(0) + 0xfee0)
  );
