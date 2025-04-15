const BenefitCard = ({ title, description }) => (
  <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
    <b>{title}</b>
    <p>{description}</p>
  </div>
)

export default BenefitCard
