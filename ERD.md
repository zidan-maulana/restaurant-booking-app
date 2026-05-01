    erDiagram
        USERS ||--o{ BOOKINGS : makes
        TABLES ||--o{ BOOKINGS : reserved_for

    USERS {
        int id PK
        varchar nama
        varchar email
        varchar password
        varchar role
        timestamp created_at
    }

    TABLES {
        int id PK
        varchar table_number
        int capacity
        varchar status
        timestamp created_at
    }

    BOOKINGS {
        int id PK
        int user_id FK
        int table_id FK
        date booking_date
        time booking_time
        int guest_count
        varchar status
        timestamp created_at
    }
