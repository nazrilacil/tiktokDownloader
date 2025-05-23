async function downloadVideo() {
    const url = document.getElementById("tiktokUrl").value;
    const api = `https://tikwm.com/api/?url=${url}`;

    try {
        const res = await fetch(api);
        const data = await res.json();
        if (data.code === 0) {
            const createTime = data.data.create_time;
            const videoUrl = data.data.play;
            console.log(data)
            const audioUrl = data.data.music;
            document.getElementById("result").innerHTML = `
        <div role="alert" class="rounded-md border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800">
        <div class="flex items-start gap-4">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-green-600">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div class="flex-1">
        <strong class="font-medium text-gray-900 dark:text-white"> Changes saved </strong>
        <p class="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
            Video ditemukan
        </p>
        </div>
        <button
        class="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        type="button"
        aria-label="Dismiss alert">
        <span class="sr-only">Berhasil</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
    </div>
    </div>
        <article class="rounded-xl border border-gray-700 bg-gray-800 p-4">
        <div class="block">
        <video src="${data.data.play}" controls class="h-64 w-full object-cover sm:h-80 lg:h-96">
        </div>
        </video><br>
        <div class="flex items-center gap-5 justify-center">
        <img alt="avatar" src="${data.data.author.avatar}"
        class="size-14 rounded-full object-cover"/>
        <h3 class="text-sm font-medium text-white">${data.data.author.nickname}</h3>
        <h3 class="text-xs text-white text-right">${data.data.music_info.title}</h3>
        <img alt="avatar" src="${data.data.music_info.cover}"
        class="size-14 rounded-full object-cover"/>
        </div>
        <div class="flex items-center gap-5 mt-5 justify-center">
        <button class="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:ring-3 focus:outline-hidden bg-white rounded" onclick="downloadMP4('${videoUrl}', '${createTime}')">
        <span class="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
        <span class="relative text-xs font-medium text-indigo-600 transition-colors group-hover:text-white">
        Download MP4</span>
        </button>
        <button class="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:ring-3 focus:outline-hidden bg-white rounded" onclick="downloadMP3('${audioUrl}', '${createTime}')">
        <span class="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
        <span class="relative text-xs font-medium text-indigo-600 transition-colors group-hover:text-white">
        Download MP3</span></button>
        </div>
        <div class="flex items-center gap-4 mt-5">
        </div>
        <ul class="mt-4 space-y-2">
            <li>
            <a class="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                <strong class="font-medium text-white">Caption</strong>
                <p class="mt-1 text-xs font-medium text-gray-300">${data.data.title}</p>
            </a>
            </li>
        </ul>
        </article>
        `;
        } else {
            document.getElementById("result").innerText = "❌ Gagal mengambil video!";
        }
    } catch (err) {
        console.error(err);
        document.getElementById("result").innerText = "❌ Error saat mengambil data.";
    }
}
async function downloadMP4(url, createTime){
const fileNameMP4 = `AcilDownloader_${createTime}.mp4`;

  const res = await fetch(url);
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download =`${fileNameMP4}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function downloadMP3(url, createTime) {
const fileNameMP3 = `AcilMusicDL_${createTime}.mp3`;

  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${fileNameMP3}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Gagal download:', err);
  }
}
