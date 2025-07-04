# 📺 Top-K Videos API

An API built with **Express.js** and **TypeScript** that tracks video view counts and returns the top-K most viewed videos within a given time window (`day`, `week`, or `month`).  
It uses a **Min Heap** for efficient retrieval and integrates **Kafka** to simulate real-time video view events.

---

## 🛠️ Features

- ⚡ Fast top-K retrieval using a custom Min Heap implementation
- 🕒 Time-based filtering (`day`, `week`, `month`)
- 📡 Real-time Kafka-based simulation and consumption
- 📦 TypeScript for type safety and clarity

---

## 🧱 Tech Stack

- **Backend**: Express.js (TypeScript)
- **Data Structure**: Min Heap
- **Message Broker**: Apache Kafka (using kafkajs)

---

## 🧩 Video Object Structure

Each video is represented with an ID, name, view count, and a timestamp indicating when it was viewed.

---

## 🧠 How It Works

### 1. Kafka Producer

The Kafka producer connects to a local Kafka instance and sends messages to the `video-views` topic. Each message represents a video object with randomized view count and timestamp. The producer uses the `kafkajs` library for integration.

### 2. Video Publisher (Simulated View Events)

A simulation function periodically generates a new video view event every second. It selects random video IDs and names from a predefined list (anime titles), assigns a random view count, and randomly selects a timestamp within one of the following windows:

- Today
- This Week
- This Month

This simulated video object is then sent to Kafka using the producer.

### 3. Kafka Consumer

The Kafka consumer subscribes to the `video-views` topic and listens for new incoming video messages. For each received video:

- If the video already exists in the heap, its view count is incremented.
- If it's a new video, it is pushed into the heap.

The consumer also uses the `kafkajs` library and runs in a separate group to allow isolated consumption.

### 4. Min Heap & Time Window Filtering

The Min Heap stores all videos and maintains fast access to the top-K viewed ones. To respond to a request like `/top/5?window=week`, the heap is filtered based on the provided time window (`day`, `week`, or `month`), sorted by views, and the top K are returned.

### 5. API Endpoint

A REST endpoint `/top/:k?window=day|week|month` is exposed via Express. It returns the top K videos based on the specified time window.

---

## 🔁 Time Windows

- `day`: Includes only views that occurred today.
- `week`: Includes views from the current calendar week (Sunday to Saturday).
- `month`: Includes all views from the current month.

---

## 🚀 Getting Started

1. **Start Kafka and Zookeeper with Docker Compose**

```bash
docker compose up -d
```

This will start Kafka and Zookeeper services in the background.

2. **Install Node.js Dependencies**

In your project root, install all dependencies:

```bash
npm install
```

3. **Start the API Server and Video Publisher**

Run the development server and start simulating video events:

```bash
npm run dev
```

Your API will be available at port 3000 and Kafka producer will send simulated video data.

---

## 📦 API Response Format

The API returns a JSON array of video objects, each containing:

- `id`: unique identifier
- `name`: video name
- `views`: number of views
- `timeStamp`: when the view occurred
