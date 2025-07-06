# 🥊 Useless Facts Club

**Useless Facts Club** is a fun and chaotic web app where weird, random trivia competes for the spotlight. Submit your own absurd facts, vote on others, and see which useless knowledge rises to the top. It's quirky, competitive, and totally unnecessary — in the best way.

---

## 🔧 Key Features

- 🧠 **Submit bizarre or completely useless facts**
- 🔼 **Vote on your favorite facts to boost them on the leaderboard**
- 🥊 **Real-time fact battles with ranking system**
- 🎲 **Randomized discovery of new and obscure facts**
- 💬 **Community-driven content and engagement**
- 📱 **Fully responsive and mobile-friendly design**

---

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) 15 – React framework for fast, modern web apps
- [Shadcn/UI](https://ui.shadcn.com/) – a set of reusable, customizable React components for building modern web interfaces
- [Prisma](https://www.prisma.io/) – Type-safe ORM for database management
- [Neon](https://neon.tech/) – Serverless PostgreSQL hosting
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Vercel](https://vercel.com/) – Hosting & serverless functions

---

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/genta-bahana-nagari/useless-facts-club.git
   cd useless-facts-club
   ```

   > The `main` branch is stable and tested.

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   Create a .env file by copying the example:

   ```bash
   cp .env.example .env
   ```

   Update the following in .env:

   ```bash
   DATABASE_URL="your_neon_database_url"
   ```

4. **Push Prisma schema and generate Prisma Client:**

   ```bash
   npx prisma db push
   ```

5. **Run the local development server:**

   ```bash
   npm run dev
   ```

6. **Run the local Prisma Studio (optional):**
   ```bash
   npx prisma studio
   ```

---

## 🌐 Deployment

This project is optimized for any kind of deployment:

### Vercel
- Push to GitHub
- Import into Vercel
- Add your environment variable DATABASE_URL
- Deploy and enjoy!

### Docker (VPS Hosting recomended)
- Push to GitHub
- Import into your VPS hosting
- Add your environment variable DATABASE_URL
- Deploy with docker-compose command and enjoy!
> Dockerfile and docker-compose.yml is provided for example

### Docker on VPS Tips

#### Database Bug
After you run the compose (specially detached mode) and the database is not attached, I get you some tips:
```bash
sudo docker exec -it web_container_name sh
```
> Check your web container name in docker compose, or run this:
```bash
docker ps
```
Inside container
```bash
npx prisma generate
npx prisma migrate deploy
```
These will connect your web app to your database hosting (if you use online database hosting).

#### Run with Other Projects

If you running this along with other projects (or services that using the same port), you can edit the traefik config in docker-compose.yml to avoid conflicts:

```bash
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
```bash
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

## 🤝 Contributing

Contributions are always welcome!  
You can fork the repo and open a pull request — or clone and build locally first to test your changes.

---

## 🌟 Show Your Support

If you find this script helpful, feel free to ⭐ the repository and share it with others!

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
