import { featureData } from '../data/data';
import FeaturesCard from './FeaturesCard';

const Features = () => {
  return (
    <section className='features'>
      <h2 className='sr-only'>Features</h2>
      {featureData.map((feature, index) => (
        <FeaturesCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
};

export default Features;
