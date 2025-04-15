import BenefitCard from './BenefitCard'

const benefits = [
  {
    title: 'EFFICIENCY:',
    description: 'Streamlined appointment scheduling that fits into your busy lifestyle.'
  },
  {
    title: 'CONVENIENCE:',
    description: 'Access to a network of trusted healthcare professionals in your area.'
  },
  {
    title: 'PERSONALIZATION:',
    description: 'Tailored recommendations and reminders to help you stay on top of your health.'
  }
]

const BenefitsSection = () => (
  <div className='flex flex-col md:flex-row mb-20'>
    {benefits.map((benefit, index) => (
      <BenefitCard key={index} title={benefit.title} description={benefit.description} />
    ))}
  </div>
)

export default BenefitsSection
