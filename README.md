# multithread_encode
video encoding server using worker_thread and fluent-ffmpeg

Node.js는 single-threaded입니다만, multi-thread operation이 불가능한 것은 아닙니다.
이는 Web-Worker API와 compatible한 worker_thread의 존재덕에 가능합니다(이를 cluster의 worker와 같은 병렬 확장으로 오해하면 안됩니다).
엄청난 길이의 encoding은 대표적인 CPU intensive한 작업으로써, multi-thread 작업에 제격입니다.
이에 따라, 작업 지시 서버가 외부에 존재한다는 가정하에, 지시받은 작업을 수행하는 encoding server를 구현해보았습니다.
