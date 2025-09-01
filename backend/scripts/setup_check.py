#!/usr/bin/env python3

"""
Quick setup script for Cinematic Career Flow backend.
This script helps users verify their environment and setup.
"""

import os
import sys
import subprocess
import importlib
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible."""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 11):
        print("❌ Python 3.11+ is required")
        print(f"   Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✅ Python version: {version.major}.{version.minor}.{version.micro}")
    return True

def check_env_file():
    """Check if .env file exists and has required variables."""
    env_path = Path(__file__).parent.parent / ".env"
    
    if not env_path.exists():
        print("❌ .env file not found")
        print("   Copy .env.example to .env and update with your API keys")
        return False
    
    print("✅ .env file found")
    
    # Check for required variables
    required_vars = [
        "DATABASE_URL",
        "PINECONE_API_KEY",
        "GOOGLE_CLOUD_PROJECT"
    ]
    
    missing_vars = []
    with open(env_path, 'r') as f:
        content = f.read()
        for var in required_vars:
            if f"{var}=" not in content or f"{var}=your-" in content:
                missing_vars.append(var)
    
    if missing_vars:
        print(f"⚠️  Missing or placeholder values in .env:")
        for var in missing_vars:
            print(f"   - {var}")
        return False
    
    print("✅ Required environment variables found")
    return True

def check_dependencies():
    """Check if required packages are installed."""
    required_packages = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "pydantic",
        "pinecone-client",
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            importlib.import_module(package.replace('-', '_'))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("❌ Missing required packages:")
        for package in missing_packages:
            print(f"   - {package}")
        print("\n   Run: pip install -r requirements.txt")
        return False
    
    print("✅ All required packages installed")
    return True

def check_docker():
    """Check if Docker is available."""
    try:
        subprocess.run(["docker", "--version"], check=True, capture_output=True)
        print("✅ Docker is available")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("⚠️  Docker not found (optional for manual setup)")
        return False

def main():
    """Main setup verification."""
    print("🚀 Cinematic Career Flow - Backend Setup Check")
    print("=" * 50)
    
    checks = [
        ("Python Version", check_python_version),
        ("Environment File", check_env_file),
        ("Dependencies", check_dependencies),
        ("Docker", check_docker)
    ]
    
    all_passed = True
    for name, check_func in checks:
        print(f"\n📋 Checking {name}...")
        if not check_func():
            all_passed = False
    
    print("\n" + "=" * 50)
    
    if all_passed:
        print("🎉 All checks passed! You're ready to start the backend.")
        print("\nNext steps:")
        print("1. Start services: docker-compose up")
        print("2. Load sample data: python scripts/load_sample_data.py")
        print("3. Visit API docs: http://localhost:8000/docs")
    else:
        print("❌ Some checks failed. Please fix the issues above.")
        print("\nFor help, check the README.md file or documentation.")

if __name__ == "__main__":
    main()
