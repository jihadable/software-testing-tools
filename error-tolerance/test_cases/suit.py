import random

def get_user_choice():
    """
    Fungsi untuk mendapatkan input pilihan dari pengguna.
    Akan meminta input berulang kali jika pengguna memasukkan input yang tidak valid.
    """
    valid_choices = ["batu", "gunting", "kertas"]
    while True:
        try:
            user_input = input("Masukkan pilihan Anda (batu, gunting, kertas): ").lower()
            if user_input not in valid_choices:
                raise ValueError("Pilihan tidak valid. Pilih antara 'batu', 'gunting', atau 'kertas'.")
            return user_input
        except ValueError as e:
            print(f"Error: {e}")
            print("Silakan coba lagi.\n")

def get_computer_choice():
    """
    Fungsi untuk mendapatkan pilihan acak komputer.
    """
    return random.choice(["batu", "gunting", "kertas"])

def determine_winner(user, computer):
    """
    Fungsi untuk menentukan pemenang berdasarkan aturan permainan.
    """
    if user == computer:
        return "Seri!"
    elif (user == "batu" and computer == "gunting") or \
         (user == "gunting" and computer == "kertas") or \
         (user == "kertas" and computer == "batu"):
        return "Anda menang!"
    else:
        return "Komputer menang!"

def play_game():
    """
    Fungsi utama untuk menjalankan game suit dengan error tolerance.
    """
    print("\n--- Selamat Datang di Game Suit (Batu-Gunting-Kertas)! ---\n")
    
    while True:
        try:
            user_choice = get_user_choice()
            computer_choice = get_computer_choice()
            
            print(f"\nPilihan Anda: {user_choice}")
            print(f"Pilihan Komputer: {computer_choice}")
            
            result = determine_winner(user_choice, computer_choice)
            print(f"Hasil: {result}\n")
            
            # Tanya pemain apakah ingin bermain lagi
            play_again = input("Ingin bermain lagi? (y/n): ").lower()
            if play_again != 'y':
                print("\nTerima kasih telah bermain! Sampai jumpa!\n")
                break
        
        except KeyboardInterrupt:
            # Menangani jika user menekan Ctrl+C untuk keluar
            print("\n\nGame dihentikan oleh pengguna. Sampai jumpa!")
            break
        except Exception as e:
            # Menangani error umum yang tidak terduga
            print(f"Terjadi kesalahan: {e}")
            print("Silakan coba lagi.\n")

if __name__ == "__main__":
    play_game()
