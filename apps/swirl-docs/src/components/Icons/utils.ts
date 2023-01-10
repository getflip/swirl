export const downloadBlob = function (data: Uint8Array, fileName: string) {
  const blob = new Blob([data], {
    type: "application/octet-stream",
  });
  const url = URL.createObjectURL(blob);

  if (typeof window) {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    a.click();
    a.remove();

    setTimeout(() => {
      return URL.revokeObjectURL(url);
    }, 0);
  }
};

interface IconDownloadInterface {
  unpkgUrl: string;
  iconName: string;
  iconPixelSize: number;
}
export async function initializeIconDownload(icon: IconDownloadInterface) {
  const { body } = await fetch(icon.unpkgUrl);
  const reader = body?.getReader();
  const iconData = await reader?.read();

  if (iconData?.value) {
    downloadBlob(iconData?.value, `${icon.iconName}${icon.iconPixelSize}.svg`);
  }
}
