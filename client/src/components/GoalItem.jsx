import styles from "./GoalItem.module.css";

function GoalItem({ goal, onDelete }) {
  return (
    <div className={styles.goal}>
      <button onClick={() => onDelete(goal._id)}>&times;</button>
      <h4>{goal.text}</h4>
    </div>
  );
}

export default GoalItem;
