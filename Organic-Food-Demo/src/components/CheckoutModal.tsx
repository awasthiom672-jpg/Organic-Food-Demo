import React, { useState, useEffect } from 'react';
import { CartItem } from '../data/products';
import {
  X,
  Truck,
  Phone,
  MapPin,
  User,
  MessageCircle,
  Mail,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Building,
  AlertCircle,
  CreditCard,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
  theme?: 'light' | 'dark';
}

const TARGET_WHATSAPP_NUMBER = '0304-4411896';
const TARGET_WHATSAPP_INTL = '923044411896';
const TARGET_EMAIL = 'Simplezubair896@gmail.com';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Form states - Mandatory
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');

  // Form states - Optional
  const [alternatePhone, setAlternatePhone] = useState('');
  const [landmark, setLandmark] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Order meta
  const [orderId, setOrderId] = useState<string>('');
  const [copiedText, setCopiedText] = useState(false);

  // Always reset to Step 1 (Customer Information) whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setCopiedText(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 6400;
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 250;
  const grandTotal = rawSubtotal + shippingFee;

  const pakistaniCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Gujranwala',
    'Sialkot',
    'Peshawar',
    'Quetta',
    'Bahawalpur',
    'Sargodha',
    'Gujrat',
    'Sheikhupura',
    'Jhelum',
    'Abbottabad',
    'Hyderabad',
    'Sukkur',
    'Other City (All Pakistan)',
  ];

  // Helper to generate absolute product link
  const getProductUrl = (productId: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://zubairorganicfoods.pk/';
    return `${origin}#product-${productId}`;
  };

  // Compile detailed order text with links
  const generateOrderMessage = (currentOrderId: string) => {
    const itemsSummary = cartItems
      .map((item, idx) => {
        const itemLink = getProductUrl(item.productId);
        return `${idx + 1}. *${item.productName}*
   • Size / Weight: ${item.weight}
   • Quantity: ${item.quantity}
   • Unit Price: Rs. ${item.price.toLocaleString()} PKR
   • Item Total: Rs. ${(item.price * item.quantity).toLocaleString()} PKR
   • Direct Product Link: ${itemLink}`;
      })
      .join('\n\n');

    let text = `*🌟 NEW ORDER - ZUBAIR ORGANIC FOODS*
━━━━━━━━━━━━━━━━━━━━━━━━
*Order Tracking ID:* #${currentOrderId}
*Date & Time:* ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}

*👤 CUSTOMER INFORMATION (Mandatory):*
• *Full Name:* ${fullName.trim()}
• *Phone Number:* ${phone.trim()}
• *Delivery City:* ${city}
• *Complete Delivery Address:* ${address.trim()}

*📋 OPTIONAL DETAILS:*
${alternatePhone.trim() ? `• *Alternate Contact:* ${alternatePhone.trim()}\n` : ''}${landmark.trim() ? `• *Nearest Landmark:* ${landmark.trim()}\n` : ''}${customerEmail.trim() ? `• *Customer Email:* ${customerEmail.trim()}\n` : ''}${notes.trim() ? `• *Delivery Instructions:* ${notes.trim()}\n` : ''}
*🛒 ORDERED PRODUCTS:*
${itemsSummary}

━━━━━━━━━━━━━━━━━━━━━━━━
*Subtotal:* Rs. ${rawSubtotal.toLocaleString()} PKR
*Shipping:* ${shippingFee === 0 ? 'FREE' : 'Rs. ' + shippingFee + ' PKR'}
*Total Payable Amount:*
👉 *Rs. ${grandTotal.toLocaleString()} PKR*

━━━━━━━━━━━━━━━━━━━━━━━━
*⚠️ PAYMENT IN ADVANCE NOTICE:*
Payment is strictly in advance.
Kindly transfer Rs. ${grandTotal.toLocaleString()} PKR via JazzCash / EasyPaisa / Bank Transfer (0304-4411896) and send the payment screenshot with this message.
━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for choosing Zubair Organic Foods!`;

    return text;
  };

  // Step 1 Submit
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      alert('Please fill in all mandatory fields (Full Name, Phone Number, City, and Delivery Address).');
      return;
    }

    const newOrderId = `ZOF-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);
    setCurrentStep(2);
  };

  // 3D WhatsApp Button Handler
  const handleSendViaWhatsApp = () => {
    const text = generateOrderMessage(orderId);
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_INTL}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    onOrderSuccess();
  };

  // 3D Email Button Handler
  const handleSendViaEmail = () => {
    const text = generateOrderMessage(orderId);
    const subject = `New Zubair Organic Foods Order #${orderId} - ${fullName} (${city}) - Rs. ${grandTotal}`;
    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(mailtoUrl, '_blank');
    onOrderSuccess();
  };

  const handleCopyOrder = () => {
    const text = generateOrderMessage(orderId);
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5">
      <div
        className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border ${
          isDark ? 'bg-[#12241E] border-[#D4A359]/30 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
        }`}
      >
        {/* Header */}
        <div className="bg-[#0F2F24] text-white p-3.5 sm:p-6 flex items-center justify-between border-b border-[#D4A359]/30">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 border-2 border-[#D4A359] overflow-hidden shrink-0 shadow-md">
              <img
                src="/src/assets/images/zubair_organic_logo_1791475320945.jpg"
                alt="Zubair Organic Foods Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#E8C882] bg-white/10 px-1.5 py-0.5 rounded shrink-0">
                  {currentStep === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}
                </span>
                <h3 className="font-display text-sm sm:text-xl font-bold truncate">
                  {currentStep === 1 ? 'Delivery Information' : 'Confirm & Dispatch Order'}
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 line-clamp-1 sm:line-clamp-none">
                {currentStep === 1
                  ? 'Fill required info; optional fields can be left blank'
                  : 'Send order via WhatsApp or Email along with payment screenshot'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* STEP 1: FORM */}
          {currentStep === 1 && (
            <form onSubmit={handleProceedToStep2} className="space-y-4 sm:space-y-6">
              {/* Order quick overview */}
              <div
                className={`p-3.5 rounded-2xl flex items-center justify-between text-xs border ${
                  isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'
                }`}
              >
                <div>
                  <span className="text-slate-400 block">Items in Order:</span>
                  <span className="font-bold">
                    {cartItems.reduce((acc, it) => acc + it.quantity, 0)} Product(s)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">Total Amount:</span>
                  <span className="font-extrabold text-[#D4A359] text-sm tabular-nums">
                    Rs. {grandTotal.toLocaleString()} PKR
                  </span>
                </div>
              </div>

              {/* MANDATORY FIELDS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4A359]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    1. Mandatory Information
                  </h4>
                  <span className="text-[11px] text-[#C85A32] font-semibold">* Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Ahmed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                          isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Primary Mobile */}
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="0321-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                          isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Delivery City *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                        isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                      }`}
                    >
                      {pakistaniCities.map((c) => (
                        <option key={c} value={c} className={isDark ? 'bg-[#0B1A15] text-white' : 'bg-white text-black'}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Complete Delivery Address (House #, Street, Area) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. House # 14, Street 8, Block B, Gulberg III, Lahore"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full p-3 text-xs sm:text-sm border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#D4A359] ${
                      isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                    }`}
                  />
                </div>
              </div>

              {/* OPTIONAL FIELDS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    2. Optional Details
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Alternate Phone */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Alternate Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0300-9876543"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value)}
                      className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#D4A359] ${
                        isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                      }`}
                    />
                  </div>

                  {/* Nearest Landmark */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Nearest Landmark
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Near Jamia Masjid / Main Market"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className={`w-full pl-8 pr-3 py-2 text-xs border rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#D4A359] ${
                          isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Customer Email */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Your Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className={`w-full pl-8 pr-3 py-2 text-xs border rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#D4A359] ${
                          isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Special Delivery Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deliver between 2 PM to 6 PM"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#D4A359] ${
                        isDark ? 'bg-[#0B1A15] border-white/20 text-white' : 'bg-white border-[#EBE6DC] text-[#0F2F24]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="btn-3d w-full py-4 px-6 bg-[#0F2F24] hover:bg-[#164233] text-[#E8C882] font-bold rounded-2xl border border-[#D4A359]/40 shadow-[0_4px_0_#060F0C] flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base group"
                >
                  <span>Continue to Payment & Order Dispatch</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Clicking Continue will open Step 2 with WhatsApp (0304-4411896) and Email ({TARGET_EMAIL}) buttons.
                </p>
              </div>
            </form>
          )}

          {/* STEP 2: 3D DISPATCH BUTTONS & ADVANCE PAYMENT NOTICE */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Back to Edit Button */}
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-[#D4A359] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Edit Customer Info</span>
              </button>

              {/* Order ID & Customer Summary Card */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 text-xs space-y-3 ${
                  isDark ? 'bg-[#0B1A15] border-[#D4A359]/30' : 'bg-[#FBF9F4] border-[#EBE6DC]'
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A359] block">
                      Order Tracking ID
                    </span>
                    <span className="font-display text-xl font-extrabold tabular-nums">
                      #{orderId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">
                      Total Payable Amount:
                    </span>
                    <span className="font-extrabold text-[#D4A359] text-base tabular-nums">
                      Rs. {grandTotal.toLocaleString()} PKR
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p><strong>Customer:</strong> {fullName}</p>
                  <p><strong>Phone:</strong> {phone}</p>
                  <p><strong>City:</strong> {city}</p>
                  <p><strong>Address:</strong> {address}</p>
                  {landmark && <p><strong>Landmark:</strong> {landmark}</p>}
                  {alternatePhone && <p><strong>Alt Phone:</strong> {alternatePhone}</p>}
                </div>

                {/* Itemized with Product Link Badges */}
                <div className="border-t border-white/10 pt-2 space-y-2">
                  <p className="font-bold text-[11px]">
                    Ordered Items with Direct Product Links:
                  </p>
                  {cartItems.map((item, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] ${
                        isDark ? 'bg-[#183129] border-white/10' : 'bg-white border-[#EBE6DC]'
                      }`}
                    >
                      <div>
                        <span className="font-bold">
                          {item.quantity}x {item.productName} ({item.weight})
                        </span>
                        <span className="text-slate-400 ml-2 tabular-nums">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      <a
                        href={getProductUrl(item.productId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#D4A359] hover:underline font-semibold text-[10px]"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Product Link</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* ADVANCE PAYMENT NOTICE BOX (ENGLISH & URDU AS REQUESTED) */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark
                    ? 'bg-[#183129] border-[#D4A359]/50'
                    : 'bg-[#FFF9EE] border-[#D4A359]/60'
                } shadow-sm space-y-3`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#C85A32] animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#C85A32]">
                    Payment Notice
                  </span>
                </div>

                {/* English Notice (مختصر) */}
                <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-slate-200' : 'text-[#2C3E35]'}`}>
                  <strong className="text-[#C85A32]">Important Notice:</strong> Payment is strictly in advance. After transferring the amount, kindly take a screenshot of the payment receipt and send it on WhatsApp to confirm your order dispatch.
                </p>

                {/* Urdu Notice (مختصر) */}
                <p
                  dir="rtl"
                  className="text-xs sm:text-sm font-bold leading-relaxed text-[#0F2F24] dark:text-[#E8C882] pt-2 border-t border-[#D4A359]/30"
                >
                  ضروری نوٹ: پیمنٹ ایڈوانس ہو گی۔ پیمنٹ ادا کرنے کے بعد رسید کا اسکرین شاٹ واٹس ایپ پر ارسال کریں تاکہ آپ کا آرڈر فوری کنفرم کیا جا سکے۔
                </p>

                {/* Account Details for Fast Transfer */}
                <div
                  className={`mt-2 p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                    isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-white border-[#EBE6DC]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#1D8354]" />
                    <span className="font-bold text-[#1D8354]">
                      JazzCash / EasyPaisa / Bank Transfer:
                    </span>
                    <span className="font-extrabold text-[#D4A359] text-sm tabular-nums tracking-wider">
                      0304-4411896
                    </span>
                  </div>
                  <span className="text-slate-400 font-medium">
                    Account Title: Zubair ur Rahman
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS: WHATSAPP & EMAIL */}
              <div className="space-y-4 pt-1">
                <div className="text-center">
                  <h4 className="font-display text-base sm:text-lg font-bold">
                    Choose How to Dispatch Your Order:
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Click one of the buttons below to dispatch with customer information & product links:
                  </p>
                </div>

                {/* BUTTON 1: WHATSAPP BUTTON */}
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="btn-3d w-full py-4 px-6 rounded-2xl font-bold text-white text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer bg-gradient-to-b from-[#1D8354] to-[#125A38] shadow-[0_6px_0_#0B3A24,0_12px_22px_rgba(29,131,84,0.35)] border-t border-white/30"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight text-white">
                      Send Order via WhatsApp
                    </div>
                    <div className="text-[11px] font-normal text-emerald-100 flex items-center gap-1.5 opacity-90">
                      <span>{TARGET_WHATSAPP_NUMBER}</span>
                      <span>•</span>
                      <span>Click to open WhatsApp directly with all details</span>
                    </div>
                  </div>
                </button>

                {/* BUTTON 2: EMAIL BUTTON (TARGET: Simplezubair896@gmail.com) */}
                <button
                  type="button"
                  onClick={handleSendViaEmail}
                  className="btn-3d w-full py-4 px-6 rounded-2xl font-bold text-[#E8C882] text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer bg-gradient-to-b from-[#0F2F24] to-[#071712] shadow-[0_6px_0_#030B08,0_12px_22px_rgba(15,47,36,0.35)] border-t border-white/20 border-x border-b border-[#D4A359]/30"
                >
                  <div className="w-8 h-8 rounded-full bg-[#D4A359]/20 flex items-center justify-center shrink-0 text-[#E8C882]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight text-white">
                      Send Order via Email
                    </div>
                    <div className="text-[11px] font-normal text-[#E8C882] flex items-center gap-1.5 opacity-90">
                      <span>{TARGET_EMAIL}</span>
                      <span>•</span>
                      <span>Click to send complete order receipt</span>
                    </div>
                  </div>
                </button>

                {/* Copy Text Option */}
                <div
                  className={`pt-2 flex items-center justify-between p-3 rounded-xl border text-xs ${
                    isDark ? 'bg-[#0B1A15] border-white/10' : 'bg-[#FBF9F4] border-[#EBE6DC]'
                  }`}
                >
                  <span className="text-slate-400">
                    Or copy complete order details to clipboard:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors cursor-pointer border border-white/10"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1D8354]" />
                        <span className="text-[#1D8354]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
