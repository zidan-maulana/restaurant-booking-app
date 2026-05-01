flowchart TD
    A[User membuka website] --> B[User register / login]
    B --> C[User melihat daftar meja]
    C --> D[User memilih meja, tanggal, jam, dan jumlah tamu]
    D --> E{Validasi backend}

    E -->|Meja tidak ditemukan| F[Booking ditolak]
    E -->|Jumlah tamu melebihi kapasitas| G[Booking ditolak]
    E -->|Meja sudah dibooking di waktu yang sama| H[Booking ditolak]
    E -->|Valid| I[Booking dibuat dengan status pending]

    I --> J[Admin melihat daftar booking]
    J --> K{Keputusan admin}

    K -->|Approve| L[Status booking menjadi approved]
    K -->|Reject| M[Status booking menjadi rejected]

    I --> N{User membatalkan?}
    N -->|Ya| O[Status booking menjadi cancelled]
    N -->|Tidak| P[Booking tetap pending / menunggu admin]

    P --> Q{Lebih dari 30 menit?}
    Q -->|Ya| R[Status booking menjadi expired]
    Q -->|Tidak| J