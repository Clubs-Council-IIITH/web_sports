const FILESERVER_URL = process.env.NEXT_PUBLIC_FILESERVER_URL || "https://clubs.iiit.ac.in";
const STATIC_URL = process.env.NEXT_PUBLIC_STATIC_URL || "https://clubs.iiit.ac.in/static";

export function getStaticFile(filepath) {
  return `${STATIC_URL}/${filepath}`;
}

export function getFile(filepath) {
  if (filepath?.toLowerCase()?.startsWith("http")) {
    // return the full URL if global URL
    return filepath;
  } else if (filepath) {
    // call files service if local URL
    return `${FILESERVER_URL}/files/download?filename=${filepath}`;
  }
}

export async function uploadFile(file, filetype = "image") {
  // early return if no file
  if (!file) return null;

  // get signed url
  let res = await fetch("/actions/files/upload");
  let {
    data: { url },
  } = await res.json();

  // upload file to signed URL
  const body = new FormData();
  body.append("file", file);

  var filename = null;
  try {
    filename = await fetch(`${url}?filetype=${filetype}`, {
      body: body,
      method: "POST",
    });
    if (filename.status >= 200 && filename.status < 300)
      filename = await filename.text();
    else filename = null;
  } catch (e) {
    filename = null;
    throw e;
  }

  return filename;
}
