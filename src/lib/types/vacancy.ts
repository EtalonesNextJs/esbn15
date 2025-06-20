export type Manager = {
  name?: string;
  phone?: string;
  viber?: string;
  telegram?: string;
  whatsapp?: string;
};
export type VacancyType = {
    imageFB?: string;
    homeImagesFB?: string[];
    homeImageFB?: string[];
    workImageFB?: string[];
    manager?: Manager;
    image?: string;
    documents?: string[];
    urgently?: boolean;
    last?: boolean;
    onSite?: boolean;
    grafik?: string;
    work_descr?: string;
    home_descr?: string;
    homePrice?: string;
    roof_type?: string;
    title?: string;
  _id?:string  
  id?: string;
    description?: string;
    location?: string;
    city?: string;
    country: string;
    date?: string;
    status?: string;
    skills?: string;
    experience?: string;
    place?: number;
    salary?: string;
    avSalary?: string;
    rentPrice?: string;
    avans?: string;
    workwear?: string;
    drivePermis?: string[];
    langue?: string[];
    workHours?: string;
    getStart?: Date;
    pDocs?: string[];
    candidates?: string[]; 
    slug?: string;
    category?: string;
  };

 export type VacancyParams = {
  city: string
  profession: string
  slug: string
}
 