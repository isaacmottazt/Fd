// middleware.js — Vercel Edge Middleware
// Bloqueia acesso direto a arquivos .html
// Rotas limpas passam normalmente

export const config = {
    matcher: ['/((?!_next|fonts|icons|manifest.json|sw.js|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.ico|.*\\.woff2).*)'],
};

export default function middleware(request) {
    const path = new URL(request.url).pathname;

    // Bloqueia qualquer acesso direto a .html — retorna 404
    if (path.endsWith('.html')) {
        return new Response('Not Found', { status: 404 });
    }
}
