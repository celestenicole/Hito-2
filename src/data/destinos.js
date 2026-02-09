export const destinos = [
  {
    id: 'lunahuana', slug: 'lunahuana', titulo: 'Lunahuaná Full Day aventura',
    descripcion: 'Canotaje, cuatrimotos y degustación de vino. Incluye transporte desde Lima, almuerzo y guía profesional.',
    precio: 180, precioAnterior: 220, categoria: 'costa', region: 'Costa central',
    duracion: 'Full Day', video: 'lunahuana.mp4',
    itinerario: ['Día 1: Salida desde Lima, canotaje en el río Cañete, visita a viñedos y cuatrimotos.'],
    imagen: 'lunahuana.mp4'
  },
  {
    id: 'huaraz', slug: 'huaraz', titulo: 'Huaraz & Cordillera Blanca',
    descripcion: 'Laguna 69, Llanganuco y nevados impresionantes. Paquete 2D/1N con hospedaje y alimentación.',
    precio: 420, precioAnterior: 480, categoria: 'sierra', region: 'Sierra norte',
    duracion: '3 días', video: 'huaraz.mp4',
    itinerario: ['Día 1: Llegada y aclimatación en Huaraz.', 'Día 2: Laguna 69 full day.', 'Día 3: Nevado Pastoruri y retorno.'],
    imagen: 'huaraz.mp4'
  },
  {
    id: 'tarapoto', slug: 'tarapoto', titulo: 'Tarapoto Selva Mágica',
    descripcion: 'Cataratas, city tour y gastronomía selvática. Paquete 3D/2N con transporte y guía.',
    precio: 650, precioAnterior: 720, categoria: 'selva', region: 'Selva norte',
    duracion: '3 días', video: 'tarapoto.mp4',
    itinerario: ['Día 1: City tour y laguna azul.', 'Día 2: Cataratas de Ahuashiyacu.', 'Día 3: Tiempo libre y retorno.'],
    imagen: 'tarapoto.mp4'
  },
  {
    id: 'cusco-machu', slug: 'cusco-machu', titulo: 'Cusco clásico + Machu Picchu',
    descripcion: 'Historia, cultura y una de las maravillas del mundo en un solo viaje.',
    precio: 1350, precioAnterior: null, categoria: 'sierra', region: 'Sierra sur',
    duracion: '5 días / 4 noches', video: 'cusco.mp4',
    itinerario: ['Día 1: Llegada, city tour y primera experiencia local.', 'Día 2: Valle Sagrado full day.', 'Día 3: Machu Picchu.', 'Día 4: Montaña de colores.', 'Día 5: Retorno.'],
    imagen: 'cusco.mp4'
  },
  {
    id: 'uyuni', slug: 'uyuni', titulo: 'Salar de Uyuni (Bolivia)',
    descripcion: 'El espejo natural más grande del mundo. Incluye transporte internacional, hospedaje y alimentación.',
    precio: 1200, precioAnterior: null, categoria: 'sudamerica', region: 'Bolivia',
    duracion: '4 días', video: 'uyuni.mp4',
    itinerario: ['Día 1: Cruce de frontera, Isla Incahuasi.', 'Día 2: Salar sunrise + lagunas.', 'Día 3: Geysers y aguas termales.', 'Día 4: Retorno.'],
    imagen: 'uyuni.mp4'
  },
  {
    id: 'ica-paracas-huacachina', slug: 'ica-paracas-huacachina', titulo: 'Ica, Paracas & Huacachina',
    descripcion: 'Islas Ballestas, Reserva de Paracas y sandboarding en Huacachina.',
    precio: 350, precioAnterior: null, categoria: 'costa', region: 'Costa sur',
    duracion: 'Full Day', video: 'ica.mp4',
    itinerario: ['Día 1: Islas Ballestas, Reserva de Paracas, Huacachina y sandboarding.'],
    imagen: 'ica.mp4'
  },
  {
    id: 'puno-titicaca', slug: 'puno-titicaca', titulo: 'Puno & Lago Titicaca',
    descripcion: 'Islas flotantes de los Uros, Taquile y city tour por Puno.',
    precio: 480, precioAnterior: null, categoria: 'sierra', region: 'Sierra sur',
    duracion: '2 días / 1 noche', video: 'fondo.mp4',
    itinerario: ['Día 1: City tour Puno, Islas de los Uros.', 'Día 2: Isla Taquile y retorno.'],
    imagen: 'fondo.mp4'
  },
  {
    id: 'iquitos-amazonas', slug: 'iquitos-amazonas', titulo: 'Iquitos & Amazonas',
    descripcion: 'Aventura en la selva amazónica. Paseos en bote, caminatas y avistamiento de fauna.',
    precio: 750, precioAnterior: null, categoria: 'selva', region: 'Selva norte',
    duracion: '3 días / 2 noches', video: 'amazonas.mp4',
    itinerario: ['Día 1: Llegada y paseo en bote por el Amazonas.', 'Día 2: Caminata selvática y fauna.', 'Día 3: Comunidad nativa y retorno.'],
    imagen: 'amazonas.mp4'
  },
  {
    id: 'mancora', slug: 'mancora', titulo: 'Playas del norte (Máncora)',
    descripcion: 'Sol, playa y relax en el norte del Perú. Hospedaje frente al mar.',
    precio: 550, precioAnterior: null, categoria: 'costa', region: 'Costa norte',
    duracion: '3 días / 2 noches', video: 'costa.mp4',
    itinerario: ['Día 1: Llegada y playa.', 'Día 2: Avistamiento de ballenas (temporada) y Órganos.', 'Día 3: Relax y retorno.'],
    imagen: 'costa.mp4'
  },
]

export const blogPosts = [
  { id: 1, titulo: 'Checklist para tu primer full day', cat: 'Tips', desc: 'Lo esencial que debes llevar: ropa, documentos, hidratación y más.', video: 'checklist.mp4' },
  { id: 2, titulo: 'Cómo viajar más gastando menos', cat: 'Finanzas', desc: 'Aprende a organizar tus gastos y aprovechar ofertas.', video: 'ahorro.mp4' },
  { id: 3, titulo: 'Fiestas que no te puedes perder', cat: 'Cultura', desc: 'Celebraciones peruanas llenas de historia y tradición.', video: 'fiestas.mp4' },
]

// Agrupar por categoría para la página destinos
export const destinosPorCategoria = {
  costa: destinos.filter(d => d.categoria === 'costa'),
  sierra: destinos.filter(d => d.categoria === 'sierra'),
  selva: destinos.filter(d => d.categoria === 'selva'),
  sudamerica: destinos.filter(d => d.categoria === 'sudamerica'),
}