import Button from "./Button";

const Card = ({ task, createdAt, dueDate, rawDueDate, onDelete, onEdit }) => {
  // Check if the task has met or passed its expiration date/time
  const isExpired = rawDueDate ? new Date() >= new Date(rawDueDate) : false;

  return (
    <div 
      className={`w-full flex flex-col py-1 rounded-lg p-2 transition-all duration-300 ${
        isExpired ? "bg-red-100 border border-red-300 opacity-80" : "bg-blue-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-blue-300 pb-2 mb-2">
        
        {/* Timestamps */}
        <div className="flex flex-col text-xs font-medium p-2 gap-1 grow">
          <div>
            <span className="font-bold text-blue-800">Created:</span> {createdAt}
          </div>
          <div>
            <span className={`font-bold ${isExpired ? "text-red-600" : "text-blue-700"}`}>
              Due:
            </span>{" "}
            {dueDate}
          </div>
          
          {/* Expiration Badge */}
          {isExpired && (
            <span className="mt-1 text-xs font-bold text-red-600 uppercase tracking-wider animate-pulse">
              ⚠️ Task Not Completed (Expired)
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 justify-end p-2 items-center">
          <Button 
            title={"Edit"} 
            style={`w-17 px-4 py-2 text-white rounded transition-all ${
              isExpired 
                ? "bg-gray-400 cursor-not-allowed opacity-50" 
                : "bg-green-600 hover:bg-green-700"
            }`} 
            // Prevent the edit function from running if expired
            AnyFunction={isExpired ? null : onEdit}
          />
          <Button 
            title={"Delete"} 
            style={"bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded"} 
            AnyFunction={onDelete}
          />
        </div>
      </div>

      <h3 className={`font-semibold text-lg leading-6 p-4 text-justify ${
        isExpired ? "text-gray-500 line-through" : "text-blue-800"
      }`}>
        {task}
      </h3>
    </div>
  );
};

export default Card;