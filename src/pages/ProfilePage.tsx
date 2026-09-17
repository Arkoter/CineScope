import { useState } from 'react';
import PageContainer from '../components/PageContainer';

interface ProfileForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
}

type ProfileErrors = Partial<Record<keyof ProfileForm, string>>;

const initialForm: ProfileForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  bio: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClassName =
  'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none';

function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>(initialForm);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof ProfileForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSuccess(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: ProfileErrors = {};

    if (form.firstName.trim() === '') newErrors.firstName = 'Le prénom est obligatoire.';
    if (form.lastName.trim() === '') newErrors.lastName = 'Le nom est obligatoire.';
    if (form.username.trim() === '') newErrors.username = 'Le pseudonyme est obligatoire.';
    if (form.email.trim() === '') {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      newErrors.email = "L'adresse e-mail n'est pas valide.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold text-white">Mon profil</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm text-slate-300">
            Prénom
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Votre prénom"
            value={form.firstName}
            onChange={handleChange('firstName')}
            className={inputClassName}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm text-slate-300">
            Nom
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Votre nom"
            value={form.lastName}
            onChange={handleChange('lastName')}
            className={inputClassName}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="username" className="mb-1 block text-sm text-slate-300">
            Pseudonyme
          </label>
          <input
            id="username"
            type="text"
            placeholder="Votre pseudonyme"
            value={form.username}
            onChange={handleChange('username')}
            className={inputClassName}
          />
          {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={form.email}
            onChange={handleChange('email')}
            className={inputClassName}
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="bio" className="mb-1 block text-sm text-slate-300">
            Biographie
          </label>
          <textarea
            id="bio"
            placeholder="Parlez-nous un peu de vous..."
            value={form.bio}
            onChange={handleChange('bio')}
            rows={4}
            className={inputClassName}
          />
        </div>

        <button
          type="submit"
          className="self-start rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
        >
          Enregistrer mon profil
        </button>

        {success && <p className="text-sm text-emerald-400">Profil enregistré avec succès.</p>}
      </form>
    </PageContainer>
  );
}

export default ProfilePage;
