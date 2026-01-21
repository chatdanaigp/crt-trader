'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
    User,
    Phone,
    MapPin,
    Upload,
    CheckCircle,
    Loader2,
    ExternalLink,
    Shield,
    Crown,
    Sparkles,
    AlertCircle,
    ArrowLeft,
    Globe,
    ChevronDown
} from 'lucide-react';

const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const REDIRECT_URI = typeof window !== 'undefined'
    ? `${window.location.origin}/api/auth/discord/callback`
    : '';

const PRODUCTS = [
    { id: 'connext_deposit', label: 'ConnextFX Deposit' },
    { id: 'master_signal', label: 'Master Signal' },
    { id: 'gss_tts', label: 'GSS/TTS' },
    { id: 'w_zone', label: 'W-zone' },
    { id: 'w_ms', label: 'W-MS' },
    { id: 'dzv', label: 'DZV' },
];

const PLATFORMS = [
    'Facebook',
    'TikTok',
    'YouTube',
    'Instagram',
    'Twitter/X',
    'Discord',
    'Line',
    'Friend Referral',
    'Other',
];

export default function RegisterPage() {
    const { language, setLanguage } = useLanguage();
    const [step, setStep] = useState('discord'); // 'discord' | 'form' | 'pending'
    const [discordUser, setDiscordUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);

    const [formData, setFormData] = useState({
        connextId: '',
        name: '',
        surname: '',
        provinceCountry: '',
        phoneNumber: '',
        platform: '',
        products: [],
        transferSlip: null,
    });

    // Check for Discord callback on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const discordData = params.get('discord');

        if (discordData) {
            try {
                const userData = JSON.parse(decodeURIComponent(discordData));
                setDiscordUser(userData);
                setStep('form');
                // Clean URL
                window.history.replaceState({}, '', '/register');
            } catch (e) {
                console.error('Failed to parse Discord data:', e);
            }
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isPlatformDropdownOpen && !event.target.closest('.platform-dropdown')) {
                setIsPlatformDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isPlatformDropdownOpen]);

    const handleDiscordLogin = () => {
        const scope = 'identify';
        const authUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
        window.location.href = authUrl;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProductToggle = (productId) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products.includes(productId)
                ? prev.products.filter(p => p !== productId)
                : [...prev.products, productId]
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError('ไฟล์มีขนาดใหญ่เกิน 10MB');
                return;
            }
            setFormData(prev => ({ ...prev, transferSlip: file }));
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('connextId', formData.connextId);
            submitData.append('name', formData.name);
            submitData.append('surname', formData.surname);
            submitData.append('provinceCountry', formData.provinceCountry);
            submitData.append('phoneNumber', formData.phoneNumber);
            submitData.append('platform', formData.platform);
            submitData.append('products', JSON.stringify(formData.products));
            submitData.append('discordId', discordUser?.id || '');
            submitData.append('discordUsername', discordUser?.username || '');
            if (formData.transferSlip) {
                submitData.append('transferSlip', formData.transferSlip);
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                body: submitData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'การลงทะเบียนล้มเหลว');
            }

            setStep('pending');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = () => {
        return (
            formData.connextId &&
            formData.name &&
            formData.surname &&
            formData.provinceCountry &&
            formData.phoneNumber &&
            formData.platform &&
            formData.products.length > 0 &&
            formData.transferSlip
        );
    };

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-discord/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 sm:py-20">
                {/* Back Button */}
                <Link
                    href="/join"
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>{language === 'th' ? 'กลับไปหน้าเลือกกลุ่ม' : 'Back to Selection'}</span>
                </Link>

                {/* Language Toggle */}
                <button
                    onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
                    className="absolute top-12 right-4 sm:right-0 flex items-center gap-2 px-3 py-1.5 glass rounded-full hover:bg-white/10 transition-all text-sm font-medium"
                >
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-white">{language.toUpperCase()}</span>
                </button>

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Crown className="w-4 h-4 text-accent" />
                        <span className="text-sm text-accent font-medium">VIP Registration</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="primary-gradient">{language === 'th' ? 'ลงทะเบียนสมาชิก VIP' : 'VIP Member Registration'}</span>
                    </h1>
                    <p className="text-text-secondary text-lg">
                        {language === 'th' ? 'เข้าร่วม Discord Master Signal Community' : 'Join Discord Master Signal Community'}
                    </p>
                </div>

                {/* Discord Login Step */}
                {step === 'discord' && (
                    <div className="glass rounded-2xl p-8 sm:p-10 text-center animate-fadeIn">
                        <div className="w-20 h-20 rounded-2xl bg-discord/20 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-discord" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">{language === 'th' ? 'เข้าสู่ระบบด้วย Discord' : 'Login with Discord'}</h2>
                        <p className="text-text-secondary mb-8">
                            {language === 'th' ? 'กรุณายืนยันตัวตนผ่าน Discord ก่อนลงทะเบียน' : 'Please verify your identity via Discord before registering'}
                        </p>

                        <button
                            onClick={handleDiscordLogin}
                            className="btn-discord w-full sm:w-auto"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                            {language === 'th' ? 'เข้าสู่ระบบด้วย Discord' : 'Login with Discord'}
                        </button>

                        <div className="mt-8 flex items-center justify-center gap-3 text-text-secondary text-sm">
                            <Shield className="w-4 h-4 text-green" />
                            <span>{language === 'th' ? 'ข้อมูลของคุณจะถูกเก็บรักษาอย่างปลอดภัย' : 'Your data is encrypted and secure'}</span>
                        </div>
                    </div>
                )}

                {/* Registration Form Step */}
                {step === 'form' && (
                    <div className="glass rounded-2xl p-6 sm:p-8 animate-fadeIn">
                        {/* Discord User Info */}
                        {discordUser && (
                            <div className="flex items-center gap-4 p-4 bg-discord/10 rounded-xl mb-8 border border-discord/20">
                                <img
                                    src={discordUser.avatar
                                        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=64`
                                        : `https://cdn.discordapp.com/embed/avatars/${parseInt(discordUser.discriminator || '0') % 5}.png`
                                    }
                                    alt="Discord Avatar"
                                    className="w-14 h-14 rounded-full border-2 border-discord"
                                />
                                <div>
                                    <p className="text-white font-semibold text-lg">
                                        {discordUser.global_name || discordUser.username}
                                    </p>
                                    <p className="text-text-secondary text-sm">
                                        @{discordUser.username}
                                    </p>
                                </div>
                                <CheckCircle className="w-6 h-6 text-green ml-auto" />
                            </div>
                        )}

                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent" />
                            {language === 'th' ? 'กรอกข้อมูลลงทะเบียน' : 'Fill in Registration Info'}
                        </h2>

                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 text-red-400">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Connext Client ID */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    {language === 'th' ? 'Connext Client ID' : 'Connext Client ID'} <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="connextId"
                                    value={formData.connextId}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, ''); // Only numbers
                                        if (val.length <= 5) {
                                            handleInputChange({ target: { name: 'connextId', value: val } });
                                        }
                                    }}
                                    placeholder={language === 'th' ? 'กรอกตัวเลข 5 หลัก' : 'Enter 5-digit number'}
                                    className="form-input"
                                    required
                                    maxLength={5}
                                    inputMode="numeric"
                                />
                                <div className="mt-2 text-xs text-text-secondary flex justify-between">
                                    <span>{language === 'th' ? 'ตัวเลข 5 หลักเท่านั้น' : '5 digits only'}</span>
                                    <Link href="/connext-guide" target="_blank" className="text-primary hover:text-accent transition-colors flex items-center gap-1">
                                        {language === 'th' ? 'ยังไม่มีบัญชี? ดูวิธีการสมัคร' : 'No account? View Guide'}
                                        <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>

                            {/* Name & Surname */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        {language === 'th' ? 'ชื่อ (Name)' : 'Name'} <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder={language === 'th' ? 'ชื่อจริง' : 'First Name'}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        {language === 'th' ? 'นามสกุล (Surname)' : 'Surname'} <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        placeholder={language === 'th' ? 'นามสกุล' : 'Last Name'}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Province / Country */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    {language === 'th' ? 'จังหวัด / ประเทศ' : 'Province / Country'} <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="provinceCountry"
                                    value={formData.provinceCountry}
                                    onChange={handleInputChange}
                                    placeholder={language === 'th' ? 'เช่น กรุงเทพ / Thailand' : 'e.g. Bangkok / Thailand'}
                                    className="form-input"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    {language === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'} <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="08X-XXX-XXXX"
                                    className="form-input"
                                    required
                                />
                            </div>

                            {/* Platform */}
                            <div className="relative platform-dropdown">
                                <label className="block text-sm font-medium text-white mb-2">
                                    {language === 'th' ? 'ติดตามมาจากช่องทางใด?' : 'Where did you follow us from?'} <span className="text-red-400">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                                    className="form-input w-full text-left flex items-center justify-between"
                                >
                                    <span className={formData.platform ? 'text-white' : 'text-text-secondary'}>
                                        {formData.platform || (language === 'th' ? '-- เลือกช่องทาง --' : '-- Select Platform --')}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${isPlatformDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isPlatformDropdownOpen && (
                                    <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl max-h-60 overflow-y-auto">
                                        <div
                                            onClick={() => {
                                                handleInputChange({ target: { name: 'platform', value: '' } });
                                                setIsPlatformDropdownOpen(false);
                                            }}
                                            className="px-4 py-3 text-text-secondary hover:bg-primary/20 hover:text-white cursor-pointer transition-colors"
                                        >
                                            {language === 'th' ? '-- เลือกช่องทาง --' : '-- Select Platform --'}
                                        </div>
                                        {PLATFORMS.map(platform => (
                                            <div
                                                key={platform}
                                                onClick={() => {
                                                    handleInputChange({ target: { name: 'platform', value: platform } });
                                                    setIsPlatformDropdownOpen(false);
                                                }}
                                                className={`px-4 py-3 cursor-pointer transition-colors ${formData.platform === platform
                                                    ? 'bg-primary text-white'
                                                    : 'text-white hover:bg-primary/20'
                                                    }`}
                                            >
                                                {platform}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Products Multi-select */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">
                                    {language === 'th' ? 'สินค้าที่คุณมี' : 'Products you owned'} <span className="text-red-400">*</span>
                                    <span className="text-text-secondary font-normal ml-2">({language === 'th' ? 'เลือกได้มากกว่า 1 รายการ' : 'Multiple selections allowed'})</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {PRODUCTS.map(product => (
                                        <label
                                            key={product.id}
                                            className={`checkbox-item ${formData.products.includes(product.id) ? 'selected' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.products.includes(product.id)}
                                                onChange={() => handleProductToggle(product.id)}
                                            />
                                            <span className="text-white">{product.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Transfer Slip Upload */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">
                                    <Upload className="w-4 h-4 inline mr-1" />
                                    {language === 'th' ? 'หลักฐานการโอนเงิน' : 'Payment Slip'} <span className="text-red-400">*</span>
                                </label>
                                <div className={`file-upload ${formData.transferSlip ? 'has-file' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {formData.transferSlip ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <CheckCircle className="w-8 h-8 text-green" />
                                            <div className="text-left">
                                                <p className="text-white font-medium">{formData.transferSlip.name}</p>
                                                <p className="text-text-secondary text-sm">
                                                    {(formData.transferSlip.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Upload className="w-10 h-10 text-text-secondary mx-auto mb-2" />
                                            <p className="text-white font-medium">{language === 'th' ? 'คลิกเพื่ออัพโหลดรูปภาพ' : 'Click to upload image'}</p>
                                            <p className="text-text-secondary text-sm mt-1">{language === 'th' ? 'PNG, JPG หรือ JPEG (สูงสุด 10MB)' : 'PNG, JPG or JPEG (Max 10MB)'}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isFormValid() || isLoading}
                                className="btn-primary w-full py-4 text-lg mt-6"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {language === 'th' ? 'กำลังส่งข้อมูล...' : 'Submitting...'}
                                    </>
                                ) : (
                                    <>
                                        {language === 'th' ? 'ส่งข้อมูลลงทะเบียน' : 'Submit Registration'}
                                        <ExternalLink className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Pending Approval Step */}
                {step === 'pending' && (
                    <div className="glass rounded-2xl p-8 sm:p-12 text-center animate-fadeIn">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 animate-pulse-primary">
                            <CheckCircle className="w-12 h-12 text-green" />
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            <span className="primary-gradient">Pending Approval</span>
                        </h2>

                        <p className="text-text-secondary text-lg mb-6">
                            {language === 'th' ? 'ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว' : 'Your information has been submitted successfully'}<br />
                            {language === 'th' ? 'กรุณารอการอนุมัติจากแอดมิน' : 'Please wait for admin approval'}
                        </p>

                        <div className="glass rounded-xl p-4 inline-flex items-center gap-3 mb-8">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                            <span className="text-yellow-500 font-medium">{language === 'th' ? 'รอการตรวจสอบ' : 'Pending Review'}</span>
                        </div>

                        <div className="space-y-3 text-text-secondary text-sm max-w-md mx-auto mb-8">
                            <p className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green flex-shrink-0 mt-0.5" />
                                <span className="text-left">{language === 'th' ? 'แอดมินจะตรวจสอบหลักฐานการโอนเงินของคุณ' : 'Admin will verify your payment slip'}</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green flex-shrink-0 mt-0.5" />
                                <span className="text-left">{language === 'th' ? 'เมื่ออนุมัติ คุณจะได้รับ VIP Role บน Discord โดยอัตโนมัติ' : 'Once approved, you will automatically receive the VIP Role'}</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green flex-shrink-0 mt-0.5" />
                                <span className="text-left">{language === 'th' ? 'พร้อมรับข้อความต้อนรับทาง DM' : 'And receive a welcome message via DM'}</span>
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/10">
                            <p className="text-white font-semibold mb-4 text-lg">⚡ {language === 'th' ? 'ขั้นตอนถัดไป: เข้าร่วม Discord Server' : 'Next Step: Join Discord Server'}</p>
                            <a href="https://discord.gg/vVr8BCUC" target="_blank" rel="noopener noreferrer" className="btn-discord inline-flex gap-2">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                {language === 'th' ? 'เข้าร่วม Discord Server' : 'Join Discord Server'}
                                <ExternalLink className="w-5 h-5" />
                            </a>
                            <p className="text-text-secondary text-sm mt-3">{language === 'th' ? 'คุณต้องเข้า Server ก่อน จึงจะได้รับ VIP Role เมื่ออนุมัติ' : 'You must join the server first to receive the VIP Role upon approval'}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
