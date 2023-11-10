import { useLoaderData, Navigate } from 'react-router-dom';
import { Starship } from '../../types/types';
import styles from './MoreInfo.module.scss';

export default function MoreInfo() {
  const data = useLoaderData() as Starship;

  if (!data) return <Navigate to="*" />;

  return (
    <div className={styles.modal}>
      <p className="name">
        <b>Name - </b>
        {data.name}
      </p>
      <p className="model">
        <b>Model - </b>
        {data.model}
      </p>
      <p className="starship-class">
        <b>Starship class - </b>
        {data.starship_class}
      </p>
      <p className="manufacturer">
        <b>Manufacturer - </b>
        {data.manufacturer}
      </p>
      <p className="max-speed">
        <b>Max speed - </b>
        {data.max_atmosphering_speed}
      </p>
      <p>
        <b>Lenght - </b>
        {data.length}
      </p>
      <p>
        <b>Capacity - </b>
        {data.cargo_capacity}
      </p>
      <p>
        <b>Passegers - </b>
        {data.passengers}
      </p>
    </div>
  );
}
