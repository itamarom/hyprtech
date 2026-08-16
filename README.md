# Hypr Consulting — static site

Static snapshot of [hyprtech.io](https://hyprtech.io/), exported from Wix and made fully
self-contained so it can be served from GitHub Pages (or any static host).

## What's in here

- `index.html` — the whole site (single page). All CSS is inline, all Wix runtime
  JavaScript has been removed.
- `assets/` — every image, font, favicon and the hero background video, downloaded from
  Wix/parastorage CDNs and referenced locally. No external requests at runtime.
- `assets/carousel.js` — a tiny vanilla-JS replacement for the Wix testimonials
  slideshow (arrows, dots, 6s autoplay). This is the only JavaScript on the site.
- `CNAME` — tells GitHub Pages the site is served at `hyprtech.io`.
- `.nojekyll` — tells GitHub Pages to serve files as-is without running Jekyll.

Changes vs. the original Wix site:

- The contact form, phone number, and WhatsApp button were removed (they needed the Wix
  backend). The contact section keeps the email link only.
- Nav links (`SERVICES`, `STORY`, `CLIENTS`, `LET'S TALK`, `TELL ME MORE`) were rewritten
  from Wix JS anchors to plain `#fragment` links with smooth scrolling; scroll offsets
  match the original.

## Deploy to GitHub Pages

1. Create an empty GitHub repository (e.g. `hyprtech-site`) and push this repo to it:

   ```sh
   git remote add origin git@github.com:<your-user>/hyprtech-site.git
   git push -u origin main
   ```

2. In the GitHub repo: **Settings → Pages**
   - *Source*: **Deploy from a branch**
   - *Branch*: `main`, folder `/ (root)` → **Save**

3. Still under **Settings → Pages**, set **Custom domain** to `hyprtech.io` and save.
   (This matches the `CNAME` file already in the repo — GitHub may just confirm it.)

4. Wait for DNS (next section) to be in place, then tick **Enforce HTTPS** once GitHub
   finishes provisioning the certificate (can take a few minutes to an hour after DNS
   resolves correctly).

Optional but recommended: verify the domain under your GitHub account
(**Settings → Pages → Verified domains**) so nobody can hijack `hyprtech.io` Pages
hosting if you ever remove the site.

## Point Cloudflare DNS at GitHub Pages

In the Cloudflare dashboard → select the `hyprtech.io` zone → **DNS → Records**:

1. **Delete the old Wix records** for the apex and `www` (Wix typically installs an `A`
   record pointing at `185.230.63.x` and/or a `CNAME` to `cdn1.wixdns.net`).

2. Add the GitHub Pages records:

   | Type  | Name  | Content                  | Proxy status |
   |-------|-------|--------------------------|--------------|
   | A     | `@`   | `185.199.108.153`        | DNS only     |
   | A     | `@`   | `185.199.109.153`        | DNS only     |
   | A     | `@`   | `185.199.110.153`        | DNS only     |
   | A     | `@`   | `185.199.111.153`        | DNS only     |
   | CNAME | `www` | `<your-user>.github.io`  | DNS only     |

3. Keep the records **DNS only (grey cloud)** at least until GitHub issues the TLS
   certificate and **Enforce HTTPS** is enabled — GitHub's cert provisioning fails behind
   Cloudflare's proxy. After HTTPS works you can leave it as DNS only (simplest, GitHub
   serves TLS directly) or switch to Proxied; if you proxy, set Cloudflare
   **SSL/TLS mode to "Full (strict)"** to avoid redirect loops.

4. Check it's live:

   ```sh
   dig +short hyprtech.io        # should list the four 185.199.10x.153 IPs
   curl -sI https://hyprtech.io/ | head -1
   ```

## Local preview

```sh
python3 -m http.server 8080
# open http://localhost:8080/
```
