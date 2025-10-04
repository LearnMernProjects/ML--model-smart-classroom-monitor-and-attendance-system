# python_api/api_server.py (Complete Code)
from flask import Flask, jsonify
from flask_cors import CORS
import threading 
import time

# Import your AttendanceSystem class from the adjacent file
from attendance_system import AttendanceSystem 

app = Flask(__name__)
# Enable CORS to allow your Next.js frontend (e.g., on port {PORT}) to access this server (on port 5000)
CORS(app) 

# Initialize the system once when the server starts
attendance_system = AttendanceSystem()
attendance_thread = None
attendance_results = [] # Storage for the final list of present students

# --- Helper function to run the blocking OpenCV function in a thread ---
def run_attendance_in_thread():
    """Runs the mark_attendance method in a separate thread."""
    global attendance_thread
    global attendance_results 
    
    try:
        # Calls the function that opens the webcam and blocks until 'q' or 's' is pressed
        present_students = attendance_system.mark_attendance()
        attendance_results = present_students # Store the list of present students
        print(f"Attendance session finished. Present: {attendance_results}")
    except Exception as e:
        print(f"Error during attendance marking: {e}")
    finally:
        attendance_thread = None


# --- API Endpoints ---

@app.route('/api/train', methods=['POST'])
def train_model_endpoint():
    """Trains the model using the collected face data."""
    try:
        attendance_system.train_model()
        return jsonify({"message": "Face recognition model trained successfully."})
    except Exception as e:
        return jsonify({"error": f"Training failed: {e}"}), 500


@app.route('/api/attendance/start', methods=['POST'])
def start_attendance_endpoint():
    """Starts the real-time attendance marking process in a non-blocking thread."""
    global attendance_thread
    global attendance_results
    
    if attendance_thread and attendance_thread.is_alive():
        return jsonify({"message": "Attendance process is already running."}), 200

    if not attendance_system.load_model():
        return jsonify({"error": "No trained model found. Please train the model first."}), 404
    
    # Clear previous results before starting new session
    attendance_results = []
    
    # Start the attendance marking function in a new thread
    attendance_thread = threading.Thread(target=run_attendance_in_thread)
    attendance_thread.start()
    
    return jsonify({
        "message": "Attendance process started. Check your webcam/terminal for the live recognition window."
    }), 202 


@app.route('/api/attendance/results', methods=['GET'])
def get_attendance_results():
    """Returns the attendance data collected from the last session."""
    global attendance_results
    
    # Check if the session is still active
    if attendance_thread and attendance_thread.is_alive():
        return jsonify({"message": "Attendance session is currently active."}), 202 

    # Return the stored results
    if attendance_results:
        return jsonify({"students_present": attendance_results}), 200
    else:
        # If the thread is dead and the list is empty, return No Content
        return jsonify({"message": "No students were marked present in the last session."}), 204


if __name__ == '__main__':
    print("Starting Flask API server on http://127.0.0.1:5000")
    # Run on port 5000 (different from Next.js)
    # The debug=True setting is helpful for development, but remove in production
    app.run(host='127.0.0.1', port=5000)
    # python_api/api_server.py (Add this new route)

@app.route('/', methods=['GET'])
def root_status():
    """Simple route to confirm the API server is alive."""
    return jsonify({
        "status": "API Server Running",
        "version": "1.0",
        "message": "Use /api/train or /api/attendance/start to access services."
    }), 200

# --- The rest of your API routes follow ---
# @app.route('/api/train', methods=['POST'])
# ...