export type Section = 'Locations' | 'About' | 'Shop' | 'Catering';

export const sections: Section[] = ['Locations', 'About', 'Shop', 'Catering'];

export const email = 'brick.street.bagels@gmail.com';

export const cateringUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSejJ79wZumKYWRqmYoiC1e84WWjSrrcjypb45LmRiXpKj1l-g/viewform';

export function directionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address + ', Boston, MA')}`;
}

export const locations = [
  { name: 'South End', address: '37 Clarendon St' },
  { name: 'South Boston', address: '371 W Broadway' }
];
