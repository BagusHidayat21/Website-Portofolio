import type { Education } from './types';

export const education = [
    {
        id: 1,
        institution: 'Universitas Negeri Malang',
        degree: 'Bachelor of Education (S1 / S.Pd)',
        field: 'Informatics Engineering Education',
        year: '2022 - 2026',
        description: 'Graduated with honors. Paired software engineering with teaching practice, the mix behind my work in vocational education and industrial mentoring.',
        isVisible: true,
        order: 1
    },
    {
        id: 2,
        institution: 'SMK Negeri 1 Jenangan Ponorogo',
        degree: 'High School Diploma',
        field: 'Software Engineering',
        year: '2019 - 2022',
        description: 'Programming, web development, databases and the software lifecycle. Where I wrote my first real applications.',
        isVisible: true,
        order: 2
    }
] satisfies Education[];
