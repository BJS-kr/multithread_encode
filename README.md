# multithread_encode
video encoding server using worker_thread and fluent-ffmpeg

Node.js는 single-threaded입니다만, multi-thread operation이 불가능한 것은 아닙니다.
이는 Web-Worker API와 compatible한 worker_thread의 존재덕에 가능합니다(이를 cluster의 worker와 같은 병렬 확장으로 오해하면 안됩니다).

엄청난 길이의 encoding은 대표적인 CPU intensive한 작업입니다. 이 repository의 구현은 adaptive streaming을 가정하고 만들어졌습니다.
즉, 하나의 작업이 아니라, 여러개의 해상도와 bitrate등의 설정을 가진 video encoding 작업을 동시에 여러개의 thread에서 실행할 것을 가정합니다.
(작업 지시 서버가 외부에 존재하며, 이 repository의 서버를 연속적으로 호출한다고 가정합니다)

HTTP요청을 받으면, 요청 본문 객체를 검사한 후 worker thread를 생성하고 응답을 반환하는 구조입니다.
