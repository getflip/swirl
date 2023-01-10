async function getIconsPackageVersion(): Promise<number> {
  const { body } = await fetch(
    "https://registry.npmjs.org/@getflip/swirl-icons"
  );
  const reader = body?.getReader();
  const packageData = await reader?.read();
  const packageDataArray = packageData?.value;

  const jsonString = Buffer.from(packageDataArray!).toString("utf8");
  const parsedData = JSON.parse(jsonString);

  return parsedData["dist-tags"].latest as number;
}

function downloadBlob(data: Uint8Array, fileName: string) {
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
}

interface IconDownloadInterface {
  iconName: string;
  iconPixelSize: number;
}
export async function initializeIconDownload(icon: IconDownloadInterface) {
  const iconPackageVersion = await getIconsPackageVersion();

  const { body } = await fetch(
    `https://unpkg.com/@getflip/swirl-icons@${iconPackageVersion}/icons/${icon.iconName}${icon.iconPixelSize}.svg`
  );
  const reader = body?.getReader();
  const iconData = await reader?.read();

  if (iconData?.value) {
    downloadBlob(iconData?.value, `${icon.iconName}${icon.iconPixelSize}.svg`);
  }
}
