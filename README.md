Shopify Analytics Backend

This project provides a full-stack service to receive, verify, and process Shopify Webhooks and show data for frontend dashboards. It supports multiple Shopify stores with per-store webhook secret verification, deduplication using Redis, and persistence via PostgreSQL + Prisma.

# Setup Instructions
  1. Clone the Repository
  git clone https://github.com/Vriti62/XENO_ASSIGNMENT.git
  
  2. Install Dependencies
  npm install
  
  3. Environment Variables
  
  Create a .env file in the backend/ directory:
  
  PORT=4000

  Database
  DATABASE_URL=postgresql://<USER>:<PASSWORD>@<HOST>/<DB_NAME>?schema=public
  
  Redis
  REDIS_URL=rediss://<USER>:<PASSWORD>@<HOST>:6379


  4. Run Database Migrations
  npx prisma migrate deploy
  
  5. Start the Server
  npm start


Backend will run on http://localhost:4000.

# Architecture
flowchart TD
  Shopify[Shopify Store] -->|Webhook Events| Backend
  Backend -->|Verify HMAC| Verification[Webhook Verification Layer]
  Verification --> Router[Express Router]
  Router --> Redis[Redis (Deduplication)]
  Router --> Prisma[Prisma ORM]
  Prisma --> DB[(PostgreSQL)]
  Backend -->|Analytics API| Frontend[React Dashboard]


Express handles routes for webhooks, users, and analytics.

Redis prevents duplicate webhook processing.

Prisma provides ORM for PostgreSQL.

Frontend consumes analytics APIs for dashboard visualization.

 # API Endpoints
Authentication

POST /user/login → Store login (mocked email/store_name).


Webhooks

POST / → Handles Shopify webhook events.
POST /store → Store creation and saving to db (backend only)

Supports: customers/create, products/create, products/update, orders/create, orders/delete, inventory_items/create.

Analytics

GET /data/customers-count → Returns total customers.

GET /data/orders-by-date?store={id}&startDate&endDate → Orders by date range.

GET /data/top-customers?store={id} → Top customers by spend.

# Database Schema (Prisma)
  //store
  model Store{
    id             String   @id @default(uuid())
    store_name     String   @unique
    user_email     String?
    webhook_secret  String?
    orders         Order[]
    products       Product[]
    created_at DateTime @default(now())
  }
  
  //user
  model Customer{
    id String @id
    cust_name String
    cust_email String @unique
    order Order[]
    created_at DateTime @default(now())
  }
  
  //product
  model Product{
    id String @id //shopify_
    prod_name String
    prod_price Float @default(0)
    prod_type String
    prod_tags String
    store Store @relation(fields:[store_id], references: [id], onDelete: Cascade)
    store_id String
    orderItem OrderItem[]
    created_at DateTime @default(now())
  }
  //order
  model Order{
    id String @id
    customer Customer @relation(fields:[cust_id], references: [id], onDelete:Cascade)
    cust_id String
    order_number Int
    order_name String
    order_price String
    store Store @relation(fields:[store_id], references: [id], onDelete: Cascade)
    store_id String
    orderItem OrderItem[]
    created_at DateTime @default(now())
  }
  
  //each item in the order
  model OrderItem {
    id String @id @default(uuid())
    order Order @relation(fields:[order_id], references: [id], onDelete:Cascade)
    order_id String 
    product Product @relation(fields:[prod_id], references: [id], onDelete:Cascade)
    prod_id String 
    quantity Int
    created_at DateTime @default(now())
  }
  
  //inventory creation 
  model InventoryItem {
    id String @id   
    sku String?     
    tracked Boolean 
    weight_value Float?
    weight_unit String?
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
  }


# Known Limitations & Assumptions

Shopify may send update events before create events.

-Handled with upsert to avoid failures, but data consistency depends on Shopify payloads.

Login

-Simple email + store_name login - with jwt and cookies

-can: For production, Shopify OAuth should be implemented.

Error Handling

-Redis/DB downtime may result in missed or duplicate events.

Frontend

-Only basic dashboard implemented (customers count, revenue, top customers, orders by date).


=============================================================================================================================================================================================================================================================================
