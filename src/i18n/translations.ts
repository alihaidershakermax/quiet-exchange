
export type Language = "en" | "ar";

export interface TranslationKeys {
  // Common
  appName: string;
  login: string;
  logout: string;
  register: string;
  profile: string;
  messages: string;
  settings: string;
  dashboard: string;
  notifications: string;
  home: string;
  send: string;
  reply: string;
  cancel: string;
  save: string;
  delete: string;
  search: string;

  // Auth
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  forgotPassword: string;
  resetPassword: string;
  loginSuccess: string;
  loginFailed: string;
  registerSuccess: string;
  logoutSuccess: string;

  // Messages
  compose: string;
  sendTo: string;
  sendAnonymously: string;
  yourMessage: string;
  sentAt: string;
  receivedAt: string;
  from: string;
  to: string;
  anonymous: string;
  messageEmpty: string;
  messageSent: string;
  messageDeleted: string;
  replyTo: string;
  likes: string;

  // Profile
  editProfile: string;
  changeAvatar: string;
  displayName: string;
  bio: string;
  role: string;
  student: string;
  admin: string;
  owner: string;
  joinedOn: string;
  profileUpdated: string;
  
  // Notifications
  markAsRead: string;
  markAllAsRead: string;
  newMessage: string;
  newReply: string;
  newLike: string;
  
  // 404 Page
  notFound: string;
  pageNotFound: string;
  returnHome: string;
  
  // Theme
  lightMode: string;
  darkMode: string;
  toggleTheme: string;
  
  // Footer
  developerName: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Common
    appName: "Whisper",
    login: "Log in",
    logout: "Log out",
    register: "Sign up",
    profile: "Profile",
    messages: "Messages",
    settings: "Settings",
    dashboard: "Dashboard",
    notifications: "Notifications",
    home: "Home",
    send: "Send",
    reply: "Reply",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    search: "Search",

    // Auth
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    email: "Email",
    forgotPassword: "Forgot Password?",
    resetPassword: "Reset Password",
    loginSuccess: "Successfully logged in",
    loginFailed: "Login failed. Please check your credentials.",
    registerSuccess: "Successfully registered",
    logoutSuccess: "Successfully logged out",

    // Messages
    compose: "Compose Message",
    sendTo: "Send to:",
    sendAnonymously: "Send anonymously",
    yourMessage: "Your message:",
    sentAt: "Sent at",
    receivedAt: "Received at",
    from: "From",
    to: "To",
    anonymous: "Anonymous",
    messageEmpty: "Message cannot be empty",
    messageSent: "Message sent successfully",
    messageDeleted: "Message deleted",
    replyTo: "Reply to",
    likes: "Likes",

    // Profile
    editProfile: "Edit Profile",
    changeAvatar: "Change Avatar",
    displayName: "Display Name",
    bio: "Bio",
    role: "Role",
    student: "Student",
    admin: "Admin",
    owner: "Owner",
    joinedOn: "Joined on",
    profileUpdated: "Profile updated successfully",
    
    // Notifications
    markAsRead: "Mark as read",
    markAllAsRead: "Mark all as read",
    newMessage: "New message",
    newReply: "New reply",
    newLike: "New like",
    
    // 404 Page
    notFound: "404",
    pageNotFound: "Oops! Page not found",
    returnHome: "Return to Home",
    
    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    toggleTheme: "Toggle theme",
    
    // Footer
    developerName: "Ali Al-Akbar Haider Shaker",
    allRightsReserved: "All rights reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service"
  },
  ar: {
    // Common
    appName: "همس",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    register: "إنشاء حساب",
    profile: "الملف الشخصي",
    messages: "الرسائل",
    settings: "الإعدادات",
    dashboard: "لوحة التحكم",
    notifications: "الإشعارات",
    home: "الرئيسية",
    send: "إرسال",
    reply: "رد",
    cancel: "إلغاء",
    save: "حفظ",
    delete: "حذف",
    search: "بحث",

    // Auth
    username: "اسم المستخدم",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    email: "البريد الإلكتروني",
    forgotPassword: "نسيت كلمة المرور؟",
    resetPassword: "إعادة تعيين كلمة المرور",
    loginSuccess: "تم تسجيل الدخول بنجاح",
    loginFailed: "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.",
    registerSuccess: "تم التسجيل بنجاح",
    logoutSuccess: "تم تسجيل الخروج بنجاح",

    // Messages
    compose: "كتابة رسالة",
    sendTo: "إرسال إلى:",
    sendAnonymously: "إرسال بشكل مجهول",
    yourMessage: "رسالتك:",
    sentAt: "أرسلت في",
    receivedAt: "استلمت في",
    from: "من",
    to: "إلى",
    anonymous: "مجهول",
    messageEmpty: "لا يمكن أن تكون الرسالة فارغة",
    messageSent: "تم إرسال الرسالة بنجاح",
    messageDeleted: "تم حذف الرسالة",
    replyTo: "الرد على",
    likes: "إعجابات",

    // Profile
    editProfile: "تعديل الملف الشخصي",
    changeAvatar: "تغيير الصورة الرمزية",
    displayName: "الاسم المعروض",
    bio: "نبذة",
    role: "الدور",
    student: "طالب",
    admin: "مسؤول",
    owner: "مالك",
    joinedOn: "انضم في",
    profileUpdated: "تم تحديث الملف الشخصي بنجاح",
    
    // Notifications
    markAsRead: "تعليم كمقروءة",
    markAllAsRead: "تعليم الكل كمقروء",
    newMessage: "رسالة جديدة",
    newReply: "رد جديد",
    newLike: "إعجاب جديد",
    
    // 404 Page
    notFound: "404",
    pageNotFound: "عذراً! الصفحة غير موجودة",
    returnHome: "العودة إلى الرئيسية",
    
    // Theme
    lightMode: "الوضع النهاري",
    darkMode: "الوضع الليلي",
    toggleTheme: "تبديل السمة",
    
    // Footer
    developerName: "علي الأكبر حيدر شاكر",
    allRightsReserved: "جميع الحقوق محفوظة",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة"
  }
};
