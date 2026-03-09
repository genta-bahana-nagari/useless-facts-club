# Useless Facts Club

## 🚀 About the Project

**Useless Facts Club** is a fun and chaotic web app where weird, random trivia competes for the spotlight. Submit your own absurd facts, vote on others, and see which useless knowledge rises to the top. It's quirky, competitive, and totally unnecessary — in the best way.

---

## 🛠️ Tech Stack

- **Frontend:** NextJS 15 (upgraded to 16), Tailwind, Shadcn/UI
- **Database:** Prisma, Neon PostgreSQL
- **Deployment:** Vercel or Docker

---

## ✨ Features

- Submit bizarre or completely useless facts
- Vote on your favorite facts to boost them on the leaderboard
- Real-time fact battles with ranking system
- Randomized discovery of new and obscure facts
- Community-driven content and engagement
- Fully responsive and mobile-friendly design

---

## 📁 Project Structure

```sh
 useless-facts-club/
 ├── prisma
 │   ├── migrations
 │   │   ├── 20250618173905_testing
 │   │   │   └── migration.sql
 │   │   ├── 20250619012716_add_fact_user_relation
 │   │   │   └── migration.sql
 │   │   └── migration_lock.toml
 │   └── schema.prisma
 ├── public
 │   └── favicon.png
 ├── src
 │   ├── app
 │   │   ├── about
 │   │   │   └── page.tsx
 │   │   ├── all
 │   │   │   └── page.tsx
 │   │   ├── api
 │   │   │   └── trpc
 │   │   │       └── [trpc]
 │   │   │           └── route.ts
 │   │   ├── leaderboard
 │   │   │   └── page.tsx
 │   │   ├── submit
 │   │   │   └── page.tsx
 │   │   ├── globals.css
 │   │   ├── layout.tsx
 │   │   ├── not-found.tsx
 │   │   ├── page.tsx
 │   │   └── providers.tsx
 │   ├── components
 │   │   ├── layout
 │   │   │   ├── footer.tsx
 │   │   │   └── navbar.tsx
 │   │   └── ui
 │   │       ├── button.tsx
 │   │       ├── card.tsx
 │   │       └── skeleton.tsx
 │   ├── lib
 │   │   └── utils.ts
 │   ├── server
 │   │   ├── api
 │   │   │   ├── context.ts
 │   │   │   ├── root.ts
 │   │   │   └── trpc.ts
 │   │   ├── routers
 │   │   │   ├── fact.ts
 │   │   │   └── index.ts
 │   │   ├── db.ts
 │   │   └── trpc.ts
 │   └── utils
 │       └── trpc.ts
 ├── .dockerignore
 ├── .env
 ├── .env.example
 ├── .gitignore
 ├── components.json
 ├── docker-compose.yml
 ├── Dockerfile
 ├── eslint.config.mjs
 ├── LICENSE
 ├── next-env.d.ts
 ├── next.config.ts
 ├── package-lock.json
 ├── package.json
 ├── postcss.config.mjs
 ├── README.md
 └── tsconfig.json
```

## 📦 Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/genta-bahana-nagari/useless-facts-club.git
   cd useless-facts-club
   ```

2. **Set environment:**

   ```sh
   cp .env.example .env
   ```

   You will see this configuration and adjust them with your keys and links:

   ```sh
    DATABASE_URL="your_postgresql_connection_string_here"
   ```
3. **Install dependencies:**

   ```sh
   npm install
  ```

4. **Push Prisma schema and generate Prisma Client:**
   ```sh
   npx prisma db push
   ```


5. **Run the development server:**

   ```sh
   npm run dev
   ```

6. Open http://localhost:3000 in your browser.

---

## 🚀 Deployment

To deploy the project, use one of these services:

- **Vercel:** `vercel --prod`, or you can connect your repo and deploy.
- **Docker:** config your own Dockerfile along with other related configurations.

### Docker on VPS Tips

#### Database Bug
After you run the compose (specially detached mode) and the database is not attached, I get you some tips:
```sh
sudo docker exec -it web_container_name sh
```
> Check your web container name in docker compose, or run this:
```sh
docker ps
```
Inside container
```sh
npx prisma generate
npx prisma migrate deploy
```
These will connect your web app to your database hosting (if you use online database hosting).

#### Run with Other Projects

If you running this along with other projects (or services that using the same port), you can edit the traefik config in docker-compose.yml to avoid conflicts:

```sh
  traefik: #for proxy
    image: traefik:v2.11
    container_name: traefik
    command:
      - "--providers.docker=true"
      - "--entrypoints.web.address=:8080"
      - "--entrypoints.websecure.address=:8443"
      - "--certificatesresolvers.myresolver.acme.httpchallenge=true"
      - "--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.myresolver.acme.email=any@gmail.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
      - "--api.dashboard=true"
      - "--log.level=DEBUG"
    ports:
      - "8080:8080"   # plain HTTP
      - "8443:8443"   # TLS
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./traefik:/letsencrypt"
```
Then you can use <strong>reverse proxy</strong> and <strong>cerbot SSL</strong> to make it secure and reliable. Nginx example:
```sh
server {
    listen 443 ssl;
    server_name your_domain.com;
    ssl_certificate /etc/letsencrypt/live/your_domain.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/your_domain.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass https://localhost:8443;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_ssl_verify off;  # because Traefik uses self-signed or ACME TLS
    }

}

server {
    if ($host = your_domain.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name your_domain.com;
    return 301 https://$host$request_uri;
}
```
> just like I did :)

---

## 👤 Author

- **Genta Bahana Nagari** – [LinkedIn](https://www.linkedin.com/in/genta-bahana-nagari/) | [GitHub](https://github.com/genta-bahana-nagari)

---

## 🌟 Show Your Support

If you find this script helpful, feel free to ⭐ the repository and share it with others!

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
