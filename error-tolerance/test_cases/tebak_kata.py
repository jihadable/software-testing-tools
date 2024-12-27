import random

def display_welcome():
    """
    Menampilkan pesan selamat datang ke permainan.
    """
    print("\n--- SELAMAT DATANG DI GAME TEBAK KATA ---")
    print("Tebak kata dengan huruf yang dikocok!")
    print("Ketik 'keluar' kapan saja untuk berhenti bermain.\n")

def choose_random_word(word_list):
    """
    Memilih kata acak dari daftar kata.
    """
    return random.choice(word_list)

def shuffle_word(word):
    """
    Mengacak huruf dalam sebuah kata.
    """
    shuffled = list(word)
    random.shuffle(shuffled)
    return ''.join(shuffled)

def get_user_guess(shuffled_word):
    """
    Mendapatkan tebakan dari pemain.
    """
    while True:
        try:
            guess = input(f"Tebak kata ini: {shuffled_word}\nJawaban Anda: ").strip().lower()
            if not guess:
                raise ValueError("Input tidak boleh kosong. Silakan coba lagi.")
            return guess
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"Terjadi kesalahan: {e}")

def play_game():
    """
    Fungsi utama untuk menjalankan permainan tebak kata.
    """
    word_list = ["python", "programming", "game", "error", "tolerance", "coding", "challenge"]
    display_welcome()
    
    while True:
        try:
            # Memilih kata acak dan mengacak hurufnya
            correct_word = choose_random_word(word_list)
            shuffled_word = shuffle_word(correct_word)
            
            # Loop sampai pemain menebak dengan benar
            while True:
                user_guess = get_user_guess(shuffled_word)
                
                # Keluar dari permainan jika pemain mengetik 'keluar'
                if user_guess == "keluar":
                    print("\nTerima kasih telah bermain. Sampai jumpa!")
                    return
                
                # Cek jawaban
                if user_guess == correct_word:
                    print("Selamat! Tebakan Anda benar!\n")
                    break
                else:
                    print("Tebakan Anda salah. Coba lagi!\n")
            
            # Tanya pemain apakah ingin bermain lagi
            play_again = input("Ingin bermain lagi? (y/n): ").strip().lower()
            if play_again != 'y':
                print("\nTerima kasih sudah bermain! Sampai jumpa!\n")
                break
        
        except KeyboardInterrupt:
            # Menangani interupsi dari pengguna
            print("\n\nPermainan dihentikan oleh pengguna. Sampai jumpa!")
            break
        except Exception as e:
            # Menangani error tidak terduga
            print(f"Terjadi kesalahan yang tidak terduga: {e}")
            print("Mengulang permainan...\n")

if __name__ == "__main__":
    play_game()
