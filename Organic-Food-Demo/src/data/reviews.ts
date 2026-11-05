export interface Review {
  id: string;
  name: string;
  location: string;
  productName: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  isUserSubmitted?: boolean;
}

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Mrs. Farzana Tariq',
    location: 'DHA Phase 5, Lahore',
    productName: '100% Pure Cow Desi Ghee',
    text: 'The aroma took me straight back to my grandmother’s kitchen in village. The grainy (danedar) texture of the Cow Ghee is outstanding when making morning parathas. Truly pure after a long time!',
    rating: 5,
    date: '2 days ago',
    verified: true,
    helpfulCount: 34,
  },
  {
    id: 'rev-2',
    name: 'Dr. Usman Khalid',
    location: 'F-7/2, Islamabad',
    productName: 'Traditional Buffalo Desi Ghee',
    text: 'As a physician, I strictly advise patients against hydrogenated commercial vegetable fats. Zubair Organic Bilona Ghee has been tested in my family kitchen for 6 months now. Genuine butyrate content and completely non-greasy.',
    rating: 5,
    date: '5 days ago',
    verified: true,
    helpfulCount: 51,
  },
  {
    id: 'rev-3',
    name: 'Chef Kamran Mughal',
    location: 'Gulshan-e-Iqbal, Karachi',
    productName: '100% Pure Cow Desi Ghee',
    text: 'We order the 5kg family tins for our special events. The high smoke point means it never burns dark, and the aroma fills the whole venue. Karachi foodies immediately recognize the authenticity.',
    rating: 5,
    date: '1 week ago',
    verified: true,
    helpfulCount: 29,
  },
  {
    id: 'rev-4',
    name: 'Bilal Ahmad',
    location: 'Wapda Town, Gujranwala',
    productName: 'Pure Cultured Makhan (White Butter)',
    text: 'Ordered the fresh makhan butter. Packing with ice packs was top-notch, delivered fresh to our doorstep. My kids love it on warm toasted bread every morning. Will order again!',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    helpfulCount: 18,
  },
  {
    id: 'rev-5',
    name: 'Ayesha Siddiqui',
    location: 'Hayatabad, Peshawar',
    productName: '100% Pure Sidr (Beri) Honey',
    text: 'The wild sidr honey has thick raw consistency, not artificially heated or diluted with sugar syrup. Zubair Organic Foods has earned our complete trust for our family breakfast.',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    helpfulCount: 37,
  },
  {
    id: 'rev-6',
    name: 'Mohammad Rizwan',
    location: 'Cantt, Rawalpindi',
    productName: 'Traditional Desi Ghee Panjeeri',
    text: 'The Desi Ghee Panjeeri was packed with premium almonds and dry fruits. Very wholesome and energetic. Great customer service on WhatsApp as well.',
    rating: 5,
    date: '1 month ago',
    verified: true,
    helpfulCount: 22,
  },
];
