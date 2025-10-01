# attendance_system.py (The complete and correct file)
import cv2
import os
import numpy as np
import pickle
from datetime import datetime

class AttendanceSystem:
    # 🚨 CORRECT CONSTRUCTOR (No nested functions)
    def __init__(self):
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        self.recognizer = cv2.face.LBPHFaceRecognizer_create()
        self.faces_dir = "faces"
        self.model_file = "face_model.yml"
        self.labels_file = "labels.pkl"
        self.attendance_list = []
        self.name_to_id = {}
        self.id_to_name = {}
        
        # Create faces directory if it doesn't exist
        if not os.path.exists(self.faces_dir):
            os.makedirs(self.faces_dir)
            
    # 🚨 CORRECT METHOD (Indented inside the class, NOT inside __init__)
    def collect_face_data(self, student_name, num_samples=50):
        """Collect face samples for a student"""
        cap = cv2.VideoCapture(0)
        count = 0
        
        # Create student directory
        student_dir = os.path.join(self.faces_dir, student_name)
        if not os.path.exists(student_dir):
            os.makedirs(student_dir)
            
        print(f"Collecting samples for {student_name}. Press 'q' to quit early.")
        
        while count < num_samples:
            ret, frame = cap.read()
            if not ret:
                break
                
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)
            
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                face_roi = gray[y:y+h, x:x+w]
                face_roi = cv2.resize(face_roi, (200, 200))
                
                # Save the face sample
                cv2.imwrite(f"{student_dir}/{count}.jpg", face_roi)
                count += 1
                
                cv2.putText(frame, f"Sample {count}/{num_samples}", (x, y-10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            cv2.imshow('Collecting Face Data', frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()
        print(f"Collected {count} samples for {student_name}")
        
    def train_model(self):
        """Train the face recognition model"""
        faces = []
        labels = []
        current_id = 0
        
        # Reset mappings
        self.name_to_id = {}
        self.id_to_name = {}
        
        for student_name in os.listdir(self.faces_dir):
            student_path = os.path.join(self.faces_dir, student_name)
            if not os.path.isdir(student_path):
                continue
                
            # Assign ID to student
            self.name_to_id[student_name] = current_id
            self.id_to_name[current_id] = student_name
            
            for image_name in os.listdir(student_path):
                if image_name.endswith('.jpg'):
                    image_path = os.path.join(student_path, image_name)
                    face_img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                    faces.append(face_img)
                    labels.append(current_id)
            
            current_id += 1
        
        if faces:
            # Train the recognizer
            self.recognizer.train(faces, np.array(labels))
            self.recognizer.save(self.model_file)
            
            # Save label mappings
            with open(self.labels_file, 'wb') as f:
                pickle.dump((self.name_to_id, self.id_to_name), f)
            
            print(f"Model trained with {len(faces)} samples from {len(self.name_to_id)} students")
        else:
            print("No face data found for training")
        
    def load_model(self):
        """Load the trained model and labels"""
        if os.path.exists(self.model_file) and os.path.exists(self.labels_file):
            self.recognizer.read(self.model_file)
            with open(self.labels_file, 'rb') as f:
                self.name_to_id, self.id_to_name = pickle.load(f)
            return True
        return False
        
    def mark_attendance(self, confidence_threshold=70):
        """Start attendance marking using face recognition"""
        if not self.load_model():
            print("No trained model found. Please train the model first.")
            return
        
        cap = cv2.VideoCapture(0)
        self.attendance_list = []
        marked_students = set()
        
        print("Starting attendance marking. Press 'q' to quit, 's' to save attendance.")
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)
            
            for (x, y, w, h) in faces:
                face_roi = gray[y:y+h, x:x+w]
                face_roi = cv2.resize(face_roi, (200, 200))
                
                # Predict the face
                id_pred, confidence = self.recognizer.predict(face_roi)
                
                if confidence < confidence_threshold and id_pred in self.id_to_name:
                    name = self.id_to_name[id_pred]
                    color = (0, 255, 0)  # Green for recognized
                    
                    # Mark attendance if not already marked
                    if name not in marked_students:
                        self.attendance_list.append({
                            'name': name,
                            'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                        })
                        marked_students.add(name)
                        print(f"Attendance marked for {name}")
                else:
                    name = "Unknown"
                    color = (0, 0, 255)  # Red for unknown
                
                # Draw rectangle and label
                cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)
                cv2.putText(frame, f"{name} ({confidence:.0f})", (x, y-10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
            
            # Display attendance count
            cv2.putText(frame, f"Present: {len(self.attendance_list)}", (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            
            cv2.imshow('Attendance System', frame)
            
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == ord('s'):
                self.save_attendance()
        
        cap.release()
        cv2.destroyAllWindows()
        return [entry['name'] for entry in self.attendance_list]
        
    def save_attendance(self):
        """Save attendance to a text file"""
        if not self.attendance_list:
            print("No attendance to save")
            return
        
        date_str = datetime.now().strftime("%Y-%m-%d")
        filename = f"attendance_{date_str}.txt"
        
        with open(filename, 'w') as f:
            f.write(f"Attendance Report - {date_str}\n")
            f.write("=" * 40 + "\n")
            for entry in self.attendance_list:
                f.write(f"{entry['name']} - {entry['time']}\n")
            f.write(f"\nTotal Present: {len(self.attendance_list)}")
        
        print(f"Attendance saved to {filename}")
        print(f"Students present: {[entry['name'] for entry in self.attendance_list]}")

# 3. Main Execution Block (NO indentation, outside the class)
if __name__ == "__main__":
    system = AttendanceSystem()
    
    # Menu system
    while True:
        print("\n--- Face Recognition Attendance System ---")
        print("1. Collect face data for a student")
        print("2. Train model")
        print("3. Mark attendance")
        print("4. Exit")
        
        choice = input("Enter your choice (1-4): ")
        
        if choice == '1':
            name = input("Enter student name: ")
            samples = int(input("Enter number of samples (default 50): ") or 50)
            system.collect_face_data(name, samples)
        
        elif choice == '2':
            system.train_model()
        
        elif choice == '3':
            system.mark_attendance()
        
        elif choice == '4':
            break
        
        else:
            print("Invalid choice")